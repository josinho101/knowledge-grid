import Base from "../base";
import * as urls from "../urls";
import { Dispatch } from "react";
import * as enums from "../../enums";
import httpStatus from "http-status-codes";
import { Data } from "../../reducers/data";
import * as settings from "../../appsettings.json";
import RequestHandler from "../../utils/requesthandler";

/**
 * Enum for the different wiki actions
 */
export enum WikiActionTypes {
  WIKI_TREE_RETRIEVAL_INITIATED = "WIKI_TREE_RETRIEVAL_INITIATED",
  WIKI_TREE_RECEIVED = "USER_DATA_RECEIVED",
  WIKI_TREE_RETRIEVAL_FAILED = "USER_DATA_RETRIEVAL_FAILED",
}

/* wiki action */
export interface WikiAction extends Base {
  type: WikiActionTypes;
  payload: Data;
}

export const getWikiTree = (token: string) => {
  return async (dispatch: Dispatch<WikiAction>) => {
    dispatch({
      type: WikiActionTypes.WIKI_TREE_RETRIEVAL_INITIATED,
      payload: {
        wikiTree: undefined!,
        status: enums.RequestStatus.initiated,
      },
    });

    const url = settings.baseUrl + urls.WIKIS;
    const response = await RequestHandler.get(url, token);
    const status =
      response?.status === httpStatus.OK
        ? enums.RequestStatus.success
        : enums.RequestStatus.failed;
    const data = response?.data?.data;

    dispatch({
      type: WikiActionTypes.WIKI_TREE_RECEIVED,
      payload: {
        wikiTree: data,
        status: status,
      },
    });
  };
};
