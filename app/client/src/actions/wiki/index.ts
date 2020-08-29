import Base from "../base";
import * as urls from "../urls";
import { Dispatch } from "react";
import * as enums from "../../enums";
import { Wiki } from "../../models/wiki";
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
  SET_SELECTED_WIKI = "SET_SELECTED_WIKIS",
  SET_EXPANDED_WIKIS = "SET_EXPANDED_WIKIS",
  SAVE_NEW_WIKI_SUCCESS = "SAVE_NEW_WIKI_SUCCESS",
  SAVE_NEW_WIKI_FAILED = "SAVE_NEW_WIKI_FAILED",
  SAVE_WIKI_INITIATED = "SAVE_WIKI_INITIATED",
  EXPAND_ALL_WIKIS = "EXPAND_ALL_WIKIS",
  COLLAPSE_ALL_WIKIS = "COLLAPSE_ALL_WIKIS",
  UPDATE_WIKI_INITIATED = "UPDATE_WIKI_INITIATED",
  UPDATE_WIKI_FAILED = "UPDATE_WIKI_FAILED",
  UPDATE_WIKI_SUCCESS = "UPDATE_WIKI_SUCCESS",
}

/* wiki action */
export interface WikiAction extends Base {
  type: WikiActionTypes;
  payload: Data;
}

export const collapseAll = () => {
  return async (dispatch: Dispatch<WikiAction>) => {
    dispatch({
      type: WikiActionTypes.COLLAPSE_ALL_WIKIS,
      payload: {
        expandedWikiIds: [],
      },
    });
  };
};

export const expandAll = (wikiIds: string[]) => {
  return async (dispatch: Dispatch<WikiAction>) => {
    dispatch({
      type: WikiActionTypes.EXPAND_ALL_WIKIS,
      payload: {
        expandedWikiIds: wikiIds,
      },
    });
  };
};

export const saveWiki = (wiki: Wiki, token: string) => {
  return async (dispatch: Dispatch<WikiAction>) => {
    dispatch({
      type: WikiActionTypes.SAVE_WIKI_INITIATED,
      payload: {
        status: enums.RequestStatus.initiated,
      },
    });

    const url = settings.baseUrl + urls.WIKIS;
    const response = await RequestHandler.post(url, wiki, token);
    const status =
      response?.status === httpStatus.OK
        ? enums.RequestStatus.success
        : enums.RequestStatus.failed;

    dispatch({
      type: WikiActionTypes.SAVE_NEW_WIKI_SUCCESS,
      payload: {
        // set wiki tree to undefined to get new updated wiki in next rerender
        wikiTree: undefined,
        status: status,
      },
    });
  };
};

export const setSelectedWiki = (wikiId: string) => {
  return async (dispatch: Dispatch<WikiAction>) => {
    dispatch({
      type: WikiActionTypes.SET_SELECTED_WIKI,
      payload: {
        selectedWikiId: wikiId,
      },
    });
  };
};

export const setExpandedWikis = (wikiIds: string[]) => {
  return async (dispatch: Dispatch<WikiAction>) => {
    dispatch({
      type: WikiActionTypes.SET_EXPANDED_WIKIS,
      payload: {
        expandedWikiIds: wikiIds,
      },
    });
  };
};

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

export const updateWiki = (token: string, wiki: Wiki) => {
  return async (dispatch: Dispatch<WikiAction>) => {
    dispatch({
      type: WikiActionTypes.UPDATE_WIKI_INITIATED,
      payload: {
        updateWikiStatus: enums.RequestStatus.initiated,
      },
    });

    const url = settings.baseUrl + urls.WIKIS + "/" + wiki.id;
    const response = await RequestHandler.put(
      url,
      { content: wiki.content },
      token
    );

    if (response?.status === httpStatus.OK) {
      dispatch({
        type: WikiActionTypes.UPDATE_WIKI_SUCCESS,
        payload: {
          updateWikiStatus: enums.RequestStatus.success,
        },
      });
    } else {
      dispatch({
        type: WikiActionTypes.UPDATE_WIKI_FAILED,
        payload: {
          updateWikiStatus: enums.RequestStatus.failed,
        },
      });
    }
  };
};
