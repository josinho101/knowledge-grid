import express from "express";
import logger from "./utils/logger";
import configureRoutes from "./controllers";
import * as settings from "./appsettings.json";
import configureMiddleware from "./middlewares";
import connectDatabase from "./utils/dbconnector";

const app: express.Application = express();
const port = process.env.PORT || settings.dev.port;

connectDatabase();
configureMiddleware(app);
configureRoutes(app);

app.listen(port, () => {
  logger.info(`Sentinel server started at port ${port}`);
});
