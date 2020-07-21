import config from "config";
import User from "../../models/User";
import logger from "../../utils/logger";
import jwt, { Secret } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import Controller from "./base/controller";
import { Response, Request } from "express";
import ApiResult from "../../models/ApiResult";
import userService from "../../services/userservice";
import { userRegistrationValidator } from "../../validators/uservalidator";

class UserController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.post("/register", userRegistrationValidator, this.register);
  }

  private register = async (req: Request, res: Response) => {
    const errors = this.validationResult(req);
    if (errors.length) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: errors } as ApiResult);
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      let user = new User({
        firstname,
        lastname,
        email,
        password,
      });

      // try registering the user and get status
      const [status, error] = await userService.register(user);
      if (!status) {
        logger.error(
          `Registration failed for ${email}, reason ${JSON.stringify(error)}`
        );
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ errors: [error] } as ApiResult);
      }

      // generate jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };

      const secret: Secret = config.get("auth.jwtTokenSecret");
      const expiresIn: number = config.get("auth.tokenExpiresInSeconds");

      jwt.sign(payload, secret, { expiresIn: expiresIn }, (err, token) => {
        if (err) {
          throw err;
        }

        logger.info(`User registration completed for user with email ${email}`);
        return res.status(httpStatus.OK).json({ token: token } as ApiResult);
      });

      return null;
    } catch {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };
}

let controller = new UserController();
export default controller.router;
