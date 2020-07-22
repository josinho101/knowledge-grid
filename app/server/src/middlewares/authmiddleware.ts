import config from "config";
import jwt from "jsonwebtoken";
import Error from "../models/error";
import httpStatus from "http-status-codes";
import ApiResult from "../models/ApiResult";
import { Response, Request, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      throw new window.Error();
    }

    const decoded = jwt.decode(token, config.get("auth.jwtTokenSecret"));
    // req.user = decoded?.user;
    return next();
  } catch (e) {
    let error: Error = { message: "Invalid token" };
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ errors: [error] } as ApiResult);
  }
};

export default auth;
