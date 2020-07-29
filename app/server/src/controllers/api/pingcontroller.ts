import Controller from "./base/controller";
import httpStatus from "http-status-codes";
import ApiResult from "../../models/ApiResult";
import { Request, Response } from "../../types/express";
import authorize from "../../middlewares/authmiddleware";

class PingController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.get("/", authorize, this.ping);
  }

  /**
   * ping
   */
  private ping = (req: Request, res: Response) => {
    return res.status(httpStatus.OK).json({ time: new Date() } as ApiResult);
  };
}

let controller = new PingController();
export default controller.router;
