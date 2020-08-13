import data, { Data } from "./data";
import auth, { Auth } from "./auth";
import { combineReducers } from "redux";
import locale, { Locale } from "./locale";
import administration, { Administration } from "./administration";

export interface AppState {
  auth: Auth;
  locale: Locale;
  data: Data;
  administration: Administration;
}

export default combineReducers<AppState>({
  data,
  auth,
  locale,
  administration,
});
