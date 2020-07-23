import User from "../../models/User";
import logger from "../../utils/logger";
import httpStatus from "http-status-codes";
import Controller from "./base/controller";
import ApiResult from "../../models/ApiResult";
import userService from "../../services/userservice";
import { Request, Response } from "../../types/express";
import authorize from "../../middlewares/authmiddleware";
import { registrationValidator } from "../../validators/uservalidator";

class UsersController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.get("/", authorize, this.get);
    this.router.get("/:userId", authorize, this.getById);
    this.router.delete("/:userId", authorize, this.delete);
    this.router.post("/register", registrationValidator, this.post);
  }

  /**
   * get user
   */
  private delete = async (req: Request, res: Response) => {
    try {
      const userId = req.params["userId"];
      await userService.delete(userId);
      logger.info(
        `Delete request for user ${userId}, initiated by ${req.user?.id}`
      );
      return res
        .status(httpStatus.OK)
        .json({ data: "User deleted" } as ApiResult);
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
  private get = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAll();
      return res.status(httpStatus.OK).json({ data: users } as ApiResult);
    } catch (e) {
      logger.error(JSON.stringify(e));
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };

  /**
   * get user
   */
  private getById = async (req: Request, res: Response) => {
    try {
      const userId = req.params["userId"];
      const user = await userService.getById(userId);
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
   * register a user
   */
  private post = async (req: Request, res: Response) => {
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
      return res.status(httpStatus.OK).json({ token: token });
    } catch (e) {
      logger.error(JSON.stringify(e));
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };
}

let controller = new UsersController();
export default controller.router;
