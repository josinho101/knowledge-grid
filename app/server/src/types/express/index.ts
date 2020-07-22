import { IUser } from "../../models/User";
import { Response as ExpResponse, Request as ExpRequest } from "express";

export interface Request extends ExpRequest {
  user?: IUser;
}

export interface Response extends ExpResponse {}
