import User from "../../models/User";
import logger from "../../utils/logger";
import Controller from "./base/controller";
import httpStatus from "http-status-codes";
import ApiResult from "../../models/ApiResult";
import userService from "../../services/userservice";
import { Request, Response } from "../../types/express";
import { loginValidator } from "../../validators/uservalidator";

class AuthController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.post("/login", loginValidator, this.login);
  }

  private login = async (req: Request, res: Response) => {
    const errors = this.validationResult(req);
    if (errors.length) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: errors } as ApiResult);
    }

    const { email, password } = req.body;

    let user = new User({
      email,
      password,
    });

    try {
      const result = await userService.login(user);
      const { status, error, token } = result;

      if (!status) {
        logger.error(
          `Login failed for user ${email}, reason ${JSON.stringify(error)}`
        );
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ errors: [result.error] } as ApiResult);
      }

      logger.info(`User login sucessful for user ${email}`);
      return res.status(httpStatus.OK).json({ token: token });
    } catch (e) {
      logger.error(JSON.stringify(e));
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };
}

let controller = new AuthController();
export default controller.router;
