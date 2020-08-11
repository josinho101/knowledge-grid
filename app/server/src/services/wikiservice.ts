import config from "config";
import mongoose from "mongoose";
import * as enums from "../enums";
import Error from "../models/error";
import Wiki, { IWiki } from "../models/Wiki";

class WikiService {
  public getWikis = async () => {
    const wikis = await Wiki.find({ status: enums.status.active });
    return wikis;
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
}

let service = new WikiService();
export default service;
