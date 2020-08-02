import Base from "../base";
import * as urls from "../urls";
import { Dispatch } from "react";
import * as enums from "../../enums";
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
}

/* Auth action */
export interface UserAction extends Base {
  type: Types;
  payload: Administration;
}
export const getUsers = (token: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: Types.USER_DATA_RETRIEVAL_INITIATED,
      payload: {
        users: undefined,
        userRequestStatus: enums.RequestStatus.initiated,
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
          userRequestStatus: enums.RequestStatus.success,
        },
      });
    } else {
      dispatch({
        type: Types.USER_DATA_RETRIEVAL_FAILED,
        payload: {
          users: undefined,
          userRequestStatus: enums.RequestStatus.failed,
        },
      });
    }
  };
};
