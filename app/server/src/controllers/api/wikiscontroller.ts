import Controller from "./base/controller";
import httpStatus from "http-status-codes";
import ApiResult from "../../models/ApiResult";
import wikiService from "../../services/wikiservice";
import { Request, Response } from "../../types/express";
import authorize from "../../middlewares/authmiddleware";
import { createWikiValidator } from "../../validators/wikivalidator";
import Wiki from "../../models/Wiki";
import logger from "../../utils/logger";

class WikisController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.post("/", authorize, createWikiValidator, this.createWiki);
  }

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
      const wiki = new Wiki({
        parentId,
        type,
        title,
      });

      const result = await wikiService.createWiki(wiki);
      if (!result.status) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: [result.error] } as ApiResult);
      }

      logger.info(`new child wiki created for ${parentId}`);

      return res
        .status(httpStatus.OK)
        .json({ data: "Wiki created" } as ApiResult);
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
