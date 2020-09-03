import Wiki from "../../models/Wiki";
import Error from "../../models/error";
import logger from "../../utils/logger";
import Controller from "./base/controller";
import httpStatus from "http-status-codes";
import ApiResult from "../../models/ApiResult";
import wikiService from "../../services/wikiservice";
import { Request, Response } from "../../types/express";
import authorize from "../../middlewares/authmiddleware";
import {
  createValidator,
  updateValidator,
} from "../../validators/wikivalidator";

class WikisController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.get("/", authorize, this.getWikiTree);
    this.router.get("/:wikiId", authorize, this.getWiki);
    this.router.post("/", authorize, createValidator, this.createWiki);
    this.router.put("/:wikiId", authorize, updateValidator, this.updateWiki);
    this.router.delete("/:wikiId", authorize, this.deleteWiki);
  }

  /**
   * delete wiki
   */
  private deleteWiki = async (req: Request, res: Response) => {
    const wikiId = req.params["wikiId"];
    const result = await wikiService.deleteById(wikiId);
    const user = req.user?.id;

    if (!result.status) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: [result.error] } as ApiResult);
    }

    logger.info(`wiki with id ${wikiId} deleted by ${user}`);

    return res
      .status(httpStatus.OK)
      .json({ data: "Wiki deleted" } as ApiResult);
  };

  /**
   * get wiki
   */
  private getWiki = async (req: Request, res: Response) => {
    const wikiId = req.params["wikiId"];
    const wiki = await wikiService.getById(wikiId);
    if (!wiki) {
      let error: Error = { message: "Wiki not found" };
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: [error] } as ApiResult);
    }

    return res.status(httpStatus.OK).json({ data: wiki } as ApiResult);
  };

  /**
   * get wiki tree
   */
  private getWikiTree = async (req: Request, res: Response) => {
    const root = await wikiService.getWikiTree();
    return res.status(httpStatus.OK).json({ data: root } as ApiResult);
  };

  /**
   * update wiki
   */
  private updateWiki = async (req: Request, res: Response) => {
    try {
      const wikiId = req.params["wikiId"];
      const { content, title } = req.body;
      const updatedBy = req.user?.id;

      const wiki = new Wiki({
        title,
        content,
        updatedBy,
        _id: wikiId,
      });

      const result = await wikiService.updateWiki(wiki);
      if (!result.status) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: [result.error] } as ApiResult);
      }

      logger.info(`wiki with id ${wikiId} updated by ${updatedBy}`);

      return res
        .status(httpStatus.OK)
        .json({ data: "wiki updated" } as ApiResult);
    } catch (e) {
      logger.error(JSON.stringify(e));
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };

  /**
   * create wiki
   */
  private createWiki = async (req: Request, res: Response) => {
    try {
      const errors = this.validationResult(req);
      if (errors.length) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ errors: errors } as ApiResult);
      }

      const { parentId, type, title } = req.body;
      const createdBy = req.user?.id;
      const wiki = new Wiki({
        parentId,
        type,
        title,
        createdBy,
        updatedBy: createdBy,
      });

      const result = await wikiService.createWiki(wiki);
      if (!result.status) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: [result.error] } as ApiResult);
      }

      logger.info(`new wiki created ${JSON.stringify(result.wiki)}`);

      return res.status(httpStatus.OK).json({ data: result.wiki } as ApiResult);
    } catch (e) {
      logger.error(JSON.stringify(e));
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };
}

let controller = new WikisController();
export default controller.router;
