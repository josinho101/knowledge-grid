import Error from "../models/error";
import logger from "../utils/logger";
import { NextFunction } from "express";
import httpStatus from "http-status-codes";
import ApiResult from "../models/ApiResult";
import { Request, Response } from "../types/express";
import TokenGenerator from "../helpers/tokengenerator";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      throw new Error();
    }

    const decoded: any = await TokenGenerator.verify(token);
    if (decoded) {
      req.user = decoded.user;
    }

    return next();
  } catch (e) {
    logger.error(JSON.stringify(e));
    let error: Error = { message: "Invalid token" };
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ errors: [error] } as ApiResult);
  }
};

export default auth;
