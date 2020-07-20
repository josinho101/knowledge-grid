import httpStatus from "http-status-codes";
import Controller from "./base/controller";
import { Response, Request } from "express";
import ApiResult from "../../models/ApiResult";
import { userRegistrationValidator } from "../../validators/uservalidator";

class UserController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.post("/register", userRegistrationValidator, this.register);
  }

  private register = (req: Request, res: Response) => {
    const errors = this.validationResult(req);

    if (errors.length) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors } as ApiResult);
    } else {
      res.send("user route");
    }
  };
}

let controller = new UserController();
export default controller.router;
