import logger from "./logger";

const connectDatabase = () => {
  try {
    logger.info("Database connection successful");
  } catch (error) {
    logger.error(`Database connection failed with error ${error}`);
    process.exit(1);
  }
};

export default connectDatabase;
