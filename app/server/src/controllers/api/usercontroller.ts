import httpStatus from "http-status-codes";
import Controller from "./base/controller";
import { Response, Request } from "express";
import { check, validationResult } from "express-validator";

class UserController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  protected mapRoute() {
    this.router.post("/register", this.registerUserValidator(), this.register);
  }

  private register = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    } else {
      res.send("user route");
    }
  };

  private registerUserValidator = () => {
    return [
      check("firstname", "Firstname is required").not().isEmpty(),
      check("email", "Email can't be empty").notEmpty(),
      check("email", "Please provide a valid email id").isEmail(),
      check("password", "Password can't be empty").notEmpty(),
      check(
        "password",
        "Please enter a password with minimum of 6 characters"
      ).isLength({ min: 6 }),
    ];
  };
}

let controller = new UserController();
export default controller.router;
