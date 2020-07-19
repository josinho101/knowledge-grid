import Controller from "./base/controller";
import { Response, Request } from "express";

class AuthController extends Controller {
  constructor() {
    super();
    this.mapRoute();
  }

  mapRoute() {
    this.router.get("/", this.auth);
  }

  private auth = (req: Request, res: Response) => {
    res.send("auth router");
  };
}

let controller = new AuthController();
export default controller.router;
