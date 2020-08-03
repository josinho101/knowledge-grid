import Base from "../base";
import * as urls from "../urls";
import { Dispatch } from "react";
import * as enums from "../../enums";
import IUser from "../../models/user";
import httpStatus from "http-status-codes";
import * as settings from "../../appsettings.json";
import RequestHandler from "../../utils/requesthandler";
import { Administration } from "../../reducers/administration";

/**
 * Enum for the different actions
 */
export enum Types {
  USER_DATA_RETRIEVAL_INITIATED = "USER_DATA_RETRIEVAL_INITIATED",
  USER_DATA_RECEIVED = "USER_DATA_RECEIVED",
  USER_DATA_RETRIEVAL_FAILED = "USER_DATA_RETRIEVAL_FAILED",
  USER_ACTION_INITIATED = "USER_ACTION_INITIATED",
  USER_ACTION_SUCCESS = "USER_ACTION_SUCCESS",
  USER_ACTION_FAILED = "USER_ACTION_FAILED",
}

/* Auth action */
export interface UserAction extends Base {
  type: Types;
  payload: Administration;
}

export const saveUser = (user: IUser, token: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: Types.USER_ACTION_INITIATED,
      payload: {
        users: undefined,
        userAction: enums.RequestStatus.initiated,
      },
    });

    const url = settings.baseUrl + urls.USER_REGISTER;
    const response = await RequestHandler.post(url, { ...user }, token);

    if (response?.status === httpStatus.OK) {
      dispatch({
        type: Types.USER_ACTION_SUCCESS,
        payload: {
          userAction: enums.RequestStatus.success,
        },
      });
    } else {
      dispatch({
        type: Types.USER_ACTION_FAILED,
        payload: {
          userAction: enums.RequestStatus.failed,
        },
      });
    }
  };
};

export const getUsers = (token: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: Types.USER_DATA_RETRIEVAL_INITIATED,
      payload: {
        users: undefined,
        userAction: enums.RequestStatus.initiated,
      },
    });

    const url = settings.baseUrl + urls.USERS;
    const response = await RequestHandler.get(url, token);

    if (response?.status === httpStatus.OK) {
      const data = response.data.data;
      dispatch({
        type: Types.USER_DATA_RECEIVED,
        payload: {
          users: data,
          userAction: enums.RequestStatus.success,
        },
      });
    } else {
      dispatch({
        type: Types.USER_DATA_RETRIEVAL_FAILED,
        payload: {
          users: undefined,
          userAction: enums.RequestStatus.failed,
        },
      });
    }
  };
};
