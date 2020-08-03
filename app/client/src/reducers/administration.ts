import IUser from "../models/user";
import { Types, UserAction } from "../actions/administration/users";
import * as enums from "../enums";

/**
 * Auth state
 */
export interface Administration {
  users?: IUser[];
  userAction?: enums.RequestStatus;
}

/**
 * initial auth state
 */
const initialState: Administration = {
  users: undefined,
  userAction: enums.RequestStatus.none,
};

export default (
  state: Administration = initialState,
  action: UserAction
): Administration => {
  switch (action.type) {
    case Types.USER_DATA_RECEIVED:
    case Types.USER_DATA_RETRIEVAL_FAILED:
    case Types.USER_DATA_RETRIEVAL_INITIATED: {
      return {
        ...state,
        users: action.payload.users,
        userAction: action.payload.userAction,
      };
    }
    default:
      return state;
  }
};
