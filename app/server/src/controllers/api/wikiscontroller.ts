import Wiki from "../../models/Wiki";
import logger from "../../utils/logger";
import Controller from "./base/controller";
import httpStatus from "http-status-codes";
import ApiResult from "../../models/ApiResult";
import wikiService from "../../services/wikiservice";
import { Request, Response } from "../../types/express";
import authorize from "../../middlewares/authmiddleware";
import { createWikiValidator } from "../../validators/wikivalidator";

class WikisController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.get("/", authorize, this.get);
    this.router.post("/", authorize, createWikiValidator, this.createWiki);
  }

  private get = async (req: Request, res: Response) => {
    const wikis = await wikiService.getWikis();
    return res.status(httpStatus.OK).json({ data: wikis } as ApiResult);
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
        createdBy,
        type,
        title,
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
