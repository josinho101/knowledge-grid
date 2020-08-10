import httpStatus from "http-status-codes";
import PingController from "./api/pingcontroller";
import AuthController from "./api/authcontroller";
import WikiController from "./api/wikiscontroller";
import UsersController from "./api/userscontroller";
import { Application, Response, Request } from "express";

const configureRoutes = (app: Application) => {
  app.use("/api/auth", AuthController);
  app.use("/api/users", UsersController);
  app.use("/api/ping", PingController);
  app.use("/api/wikis", WikiController);

  // route for handling 404 errors. Should be the last route.
  app.use((req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).send({ error: "Not Found" });
  });
};

export default configureRoutes;
