import User from "../../models/User";
import logger from "../../utils/logger";
import httpStatus from "http-status-codes";
import Controller from "./base/controller";
import ApiResult from "../../models/ApiResult";
import userService from "../../services/userservice";
import { Request, Response } from "../../types/express";
import authorize from "../../middlewares/authmiddleware";
import { userRegistrationValidator } from "../../validators/uservalidator";

class UserController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.get("/", authorize, this.getUsers);
    this.router.get("/:userId", authorize, this.getUser);
    this.router.post("/register", userRegistrationValidator, this.register);
  }

  /**
   * get user
   */
  private getUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params["userId"];
      const user = await userService.getUserById(userId);
      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ errors: `User not found with id ${userId}` } as ApiResult);
      }

      return res.status(httpStatus.OK).json({ data: user } as ApiResult);
    } catch (e) {
      logger.error(JSON.stringify(e));
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };

  /**
   * get all users
   */
  private getUsers = async (req: Request, res: Response) => {
    try {
      return res.status(httpStatus.OK).json({ data: req.user } as ApiResult);
    } catch (e) {
      logger.error(JSON.stringify(e));
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };

  /**
   * register a user
   */
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

      // try register the user and get token
      const result = await userService.register(user);
      const { status, error, token } = result;

      if (!status) {
        logger.error(
          `Registration failed for ${email}, reason ${JSON.stringify(error)}`
        );
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ errors: [error] } as ApiResult);
      }

      logger.info(`User registration sucessful for user ${email}`);
      return res.status(httpStatus.OK).json({ token: token } as ApiResult);
    } catch (e) {
      logger.error(JSON.stringify(e));
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };
}

let controller = new UserController();
export default controller.router;
