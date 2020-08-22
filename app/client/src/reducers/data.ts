import * as enums from "../enums";
import { Wiki } from "../models/wiki";
import * as constants from "../constants";
import StorageHelper from "../utils/storagehelper";
import { WikiActionTypes, WikiAction } from "../actions/wiki";

/**
 * data state
 */
export interface Data {
  wikiTree?: Wiki;
  selectedWikiId?: string;
  expandedWikiIds?: string[];
  status?: enums.RequestStatus;
}

const selectedWikiId = StorageHelper.get(constants.Keys.SELECTED_WIKI);
const expandedWikiIds = StorageHelper.get(constants.Keys.EXPANDED_WIKIS);

/**
 * initial data state
 */
const initialState: Data = {
  wikiTree: undefined!,
  selectedWikiId: selectedWikiId || undefined,
  expandedWikiIds: expandedWikiIds ? JSON.parse(expandedWikiIds) : [],
  status: enums.RequestStatus.none,
};

export default (state: Data = initialState, action: WikiAction): Data => {
  const { payload } = action;

  switch (action.type) {
    case WikiActionTypes.SET_SELECTED_WIKI: {
      const wikiId = payload.selectedWikiId;
      StorageHelper.set(constants.Keys.SELECTED_WIKI, wikiId);
      return {
        ...state,
        selectedWikiId: wikiId,
      };
    }
    case WikiActionTypes.SET_EXPANDED_WIKIS: {
      const wikiIds = payload.expandedWikiIds ? payload.expandedWikiIds : [];
      StorageHelper.set(constants.Keys.EXPANDED_WIKIS, JSON.stringify(wikiIds));
      return {
        ...state,
        expandedWikiIds: wikiIds,
      };
    }
    case WikiActionTypes.SAVE_NEW_WIKI_SUCCESS:
    case WikiActionTypes.WIKI_TREE_RECEIVED:
    case WikiActionTypes.WIKI_TREE_RETRIEVAL_FAILED:
    case WikiActionTypes.WIKI_TREE_RETRIEVAL_INITIATED: {
      return {
        ...state,
        wikiTree: payload.wikiTree,
        status: payload.status,
      };
    }
    default:
      return state;
  }
};
