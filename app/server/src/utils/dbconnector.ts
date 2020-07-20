import logger from "./logger";
import mongoose from "mongoose";
import config from "config";

const connectDatabase = async () => {
  const dbURI: string = config.get("dbURI");
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(dbURI, options, (error) => {
    if (error) {
      logger.error(`Database connection failed with error ${error}`);
      process.exit(1);
    } else {
      logger.info("Database connection successful");
    }
  });
};

export default connectDatabase;
