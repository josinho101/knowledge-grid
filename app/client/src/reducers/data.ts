import * as enums from "../enums";
import { Wiki } from "../models/wiki";
import { WikiActionTypes, WikiAction } from "../actions/wiki";

/**
 * data state
 */
export interface Data {
  wikiTree: Wiki;
  status: enums.RequestStatus;
}

/**
 * initial data state
 */
const initialState: Data = {
  wikiTree: undefined!,
  status: enums.RequestStatus.none,
};

export default (state: Data = initialState, action: WikiAction): Data => {
  const { payload } = action;

  switch (action.type) {
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
