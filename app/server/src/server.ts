import config from "config";
import express from "express";
import logger from "./utils/logger";
import configureRoutes from "./controllers";
import configureMiddleware from "./middlewares";
import connectDatabase from "./utils/dbconnector";

const app: express.Application = express();
const port = process.env.PORT || config.get("port");

(async () => {
  logger.info(`============ Starting sentinel server ============`);

  await connectDatabase();
  configureMiddleware(app);
  configureRoutes(app);

  app.listen(port, () => {
    logger.info(`Sentinel server started running on port ${port}`);
  });
})();
