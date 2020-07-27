import { Types, LocaleAction } from "../actions/locale";

/**
 * locale state
 */
export interface Locale {
  code: string;
}

/**
 * initial locale state
 */
const initialState: Locale = {
  code: undefined!,
};

export default (state: Locale = initialState, action: LocaleAction): Locale => {
  const { payload } = action;
  switch (action.type) {
    case Types.LANGUAGE_FILE_LOADED: {
      return {
        ...state,
        code: payload.code,
      };
    }
    default:
      return state;
  }
};
