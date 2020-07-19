import winston from "winston";
import { format } from "winston";
const { combine, timestamp, prettyPrint } = format;

class Logger {
  private _logger: winston.Logger;

  constructor() {
    let today = new Date();
    let filename = `logs/sentinel-${today.getDate()}-${
      today.getMonth() + 1
    }-${today.getFullYear()}.log`;

    this._logger = winston.createLogger({
      level: "info",
      format: combine(timestamp(), prettyPrint()),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: filename }),
      ],
    });
  }

  /**
   * log as info
   * @param object object to log
   */
  public info(object: any) {
    this._logger.info(object);
  }

  /**
   * log as error
   * @param object object to log
   */
  public error(object: any) {
    this._logger.error(object);
  }
}

export default new Logger();
