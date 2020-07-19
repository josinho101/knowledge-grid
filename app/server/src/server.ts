import express from "express";
import configureMIddleware from "./middlewares";
import logger from "./utils/logger";

const app: express.Application = express();
const port = process.env.PORT || 3001;

configureMIddleware(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  logger.info(`Sentinel server started at port ${port}`);
});
