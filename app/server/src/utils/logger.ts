import winston from "winston";
import { format } from "winston";
const { combine, timestamp, prettyPrint } = format;
import * as settings from "../appsettings.json";

class Logger {
  private _logger: winston.Logger;

  constructor() {
    let today = new Date();
    let filename = `logs/sentinel-${today.getDate()}-${
      today.getMonth() + 1
    }-${today.getFullYear()}.log`;

    this._logger = winston.createLogger({
      level: settings.Log.level,
      format: combine(timestamp(), prettyPrint()),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
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
   * log as warning
   * @param object object to log
   */
  public warning(object: any) {
    this._logger.warning(object);
  }

  /**
   * log as debug
   * @param object object to log
   */
  public debug(object: any) {
    this._logger.debug(object);
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
