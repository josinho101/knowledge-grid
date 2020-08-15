import * as enums from "../enums";
import { Wiki } from "../models/wiki";
import { WikiActionTypes, WikiAction } from "../actions/wiki";

/**
 * data state
 */
export interface Data {
  wikiTree?: Wiki;
  selectedWikiIds?: string[];
  expandedWikiIds?: string[];
  status?: enums.RequestStatus;
}

/**
 * initial data state
 */
const initialState: Data = {
  wikiTree: undefined!,
  selectedWikiIds: [],
  expandedWikiIds: [],
  status: enums.RequestStatus.none,
};

export default (state: Data = initialState, action: WikiAction): Data => {
  const { payload } = action;

  switch (action.type) {
    case WikiActionTypes.SET_SELECTED_WIKIS: {
      return {
        ...state,
        selectedWikiIds: payload.selectedWikiIds,
      };
    }
    case WikiActionTypes.SET_EXPANDED_WIKIS: {
      return {
        ...state,
        expandedWikiIds: payload.expandedWikiIds,
      };
    }
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
