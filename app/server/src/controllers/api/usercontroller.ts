import config from "config";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import User from "../../models/User";
import Error from "../../models/error";
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

  private register = async (req: Request, res: Response) => {
    const errors = this.validationResult(req);
    if (errors.length) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: errors } as ApiResult);
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      // check if user already exist
      let user = await User.findOne({ email });
      if (user) {
        let error: Error = { message: "User with email already exist" };
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ errors: [error] } as ApiResult);
      }

      user = new User({
        firstname,
        lastname,
        email,
        password,
      });

      // hash password and assign it to user instance
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save user
      await user.save();

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

        return res.status(httpStatus.OK).json({ token: token });
      });

      return null;
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: "Server Error" } as ApiResult);
    }
  };
}

let controller = new UserController();
export default controller.router;
