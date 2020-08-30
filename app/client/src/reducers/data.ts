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
  selectedWiki?: Wiki;
  expandedWikiIds?: string[];
  status?: enums.RequestStatus;
  updateWikiStatus?: enums.RequestStatus;
}

const selectedWiki = StorageHelper.get(constants.Keys.SELECTED_WIKI);
const expandedWikiIds = StorageHelper.get(constants.Keys.EXPANDED_WIKIS);

/**
 * initial data state
 */
const initialState: Data = {
  wikiTree: undefined!,
  selectedWiki: selectedWiki ? JSON.parse(selectedWiki) : undefined,
  expandedWikiIds: expandedWikiIds ? JSON.parse(expandedWikiIds) : [],
  status: enums.RequestStatus.none,
  updateWikiStatus: enums.RequestStatus.none,
};

export default (state: Data = initialState, action: WikiAction): Data => {
  const { payload } = action;

  switch (action.type) {
    case WikiActionTypes.SET_SELECTED_WIKI: {
      const selectedWiki = payload.selectedWiki;
      StorageHelper.set(
        constants.Keys.SELECTED_WIKI,
        JSON.stringify(selectedWiki)
      );
      return {
        ...state,
        selectedWiki: selectedWiki,
      };
    }
    case WikiActionTypes.SET_EXPANDED_WIKIS: {
      const wikiIds = payload.expandedWikiIds || [];
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
    case WikiActionTypes.EXPAND_ALL_WIKIS: {
      const wikiIds = payload.expandedWikiIds || [];
      StorageHelper.set(constants.Keys.EXPANDED_WIKIS, JSON.stringify(wikiIds));
      return {
        ...state,
        expandedWikiIds: wikiIds,
      };
    }
    case WikiActionTypes.COLLAPSE_ALL_WIKIS: {
      StorageHelper.remove(constants.Keys.EXPANDED_WIKIS);
      return {
        ...state,
        expandedWikiIds: payload.expandedWikiIds,
      };
    }
    case WikiActionTypes.UPDATE_WIKI_FAILED:
    case WikiActionTypes.UPDATE_WIKI_SUCCESS:
    case WikiActionTypes.UPDATE_WIKI_INITIATED: {
      return {
        ...state,
        updateWikiStatus: payload.updateWikiStatus,
      };
    }
    default:
      return state;
  }
};
