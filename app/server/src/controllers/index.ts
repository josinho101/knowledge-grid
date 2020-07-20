import httpStatus from "http-status-codes";
import AuthController from "./api/authcontroller";
import UserController from "./api/usercontroller";
import { Application, Response, Request } from "express";

const configureRoutes = (app: Application) => {
  app.use("/api/auth", AuthController);
  app.use("/api/user", UserController);

  // route for handling 404 errors. Should be the last route.
  app.use((req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).send({ error: "Not Found" });
  });
};

export default configureRoutes;
