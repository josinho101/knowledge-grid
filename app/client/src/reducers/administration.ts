import IUser from "../models/user";
import { Types, UserAction } from "../actions/administration/users";
import * as enums from "../enums";

/**
 * Auth state
 */
export interface Administration {
  users?: IUser[];
  userRequestStatus?: enums.RequestStatus;
}

/**
 * initial auth state
 */
const initialState: Administration = {
  users: undefined,
  userRequestStatus: enums.RequestStatus.none,
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
        userRequestStatus: action.payload.userRequestStatus,
      };
    }
    default:
      return state;
  }
};
