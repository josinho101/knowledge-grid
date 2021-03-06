import mongoose from "mongoose";
import * as enums from "../enums";
import Error from "../models/error";
import Wiki, { IWiki } from "../models/Wiki";
import { IWikiViewModel } from "../models/wikiviewmodel";

class WikiService {
  public getWikiTree = async () => {
    const wikis = await Wiki.find({ status: enums.status.active });
    const rootWiki = wikis.find((i) => i.parentId === undefined);
    if (rootWiki) {
      const root: IWikiViewModel = {
        id: rootWiki._id,
        title: rootWiki.title,
        type: rootWiki.type,
      };

      this.constructWikiTree(root, wikis);

      return root;
    }

    return undefined;
  };

  /**
   * update wiki
   * @param wiki wiki to update
   */
  public updateWiki = async (wiki: IWiki) => {
    let status = false;
    let error: Error = {};
    let failureMessage = "wiki not found";

    try {
      const dbWiki = await this.getById(wiki._id);
      if (!dbWiki) {
        error.message = failureMessage;
      } else {
        dbWiki.title = wiki.title;
        dbWiki.content = wiki.content;
        dbWiki.updatedBy = wiki.updatedBy;
        await dbWiki.save();
        status = true;
      }
    } catch (e) {
      error.message = e.message;
    }

    return { status, error };
  };

  /**
   * create new wiki
   * @param wiki wiki object
   */
  public createWiki = async (wiki: IWiki) => {
    let status = false;
    let error: Error = {};
    let failureMessage = "parent wiki not found";
    const parent = await this.getById(wiki.parentId);

    try {
      if (!parent) {
        error.message = failureMessage;
      } else {
        wiki.status = enums.status.active;
        wiki.createdDate = new Date();
        await wiki.save();
        status = true;
      }
    } catch (e) {
      error.message = e.message;
    }

    return { status, error, wiki };
  };

  /**
   * return wiki object
   * @param id wiki id
   */
  public getById = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    return await Wiki.findOne({ _id: id, status: enums.status.active });
  };

  /**
   * delete a wiki
   * @param id wiki id
   */
  public deleteById = async (id: string) => {
    let status = false;
    let error: Error = {};
    let failureMessage = "Invalid wiki id";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      error.message = failureMessage;
    } else {
      await Wiki.findByIdAndUpdate(
        { _id: id },
        { status: enums.status.deleted }
      );
      status = true;
    }

    return { status, error };
  };

  /**
   * construct wiki tree
   * @param wiki parent wiki
   * @param wikis all wikis from db
   */
  private constructWikiTree(wiki: IWikiViewModel, wikis: IWiki[]) {
    const children = wikis.filter(
      (i) => i.parentId?.toString() === wiki.id?.toString()
    );

    if (children && children.length) {
      if (!wiki.children) {
        wiki.children = [];
      }

      children.forEach((w) => {
        const childWiki: IWikiViewModel = {
          id: w._id,
          title: w.title,
          type: w.type,
        };
        wiki.children?.push(childWiki);

        if (childWiki.type === enums.wikiType.folder) {
          this.constructWikiTree(childWiki, wikis);
        }
      });
    }
  }
}

let service = new WikiService();
export default service;
