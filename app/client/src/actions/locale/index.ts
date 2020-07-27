import Base from "../base";
import * as urls from "../urls";
import { Dispatch } from "react";
import httpStatus from "http-status-codes";
import { Locale } from "../../reducers/locale";
import localeHelper from "../../utils/localehelper";
import RequestHandler from "../../utils/requesthandler";

/**
 * Enum for the different locale actions
 */
export enum Types {
  LANGUAGE_FILE_LOADED = "LANGUAGE_FILE_LOADED",
}

/* Locale action */
export interface LocaleAction extends Base {
  type: Types;
  payload: Locale;
}

export const loadLocaleFile = () => {
  return async (dispatch: Dispatch<LocaleAction>) => {
    const url = `${urls.LANGUAGE_FILE}?v=${Date.now()}`;
    const response = await RequestHandler.get(url);
    const locale = "en-us";

    if (response?.status === httpStatus.OK) {
      localeHelper.initialize(locale, response.data);
      dispatch({
        type: Types.LANGUAGE_FILE_LOADED,
        payload: {
          code: locale,
        },
      });
    }
  };
};
