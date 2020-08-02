import auth, { Auth } from "./auth";
import { combineReducers } from "redux";
import locale, { Locale } from "./locale";
import administration, { Administration } from "./administration";

export interface AppState {
  auth: Auth;
  locale: Locale;
  administration: Administration;
}

export default combineReducers<AppState>({
  auth,
  locale,
  administration,
});
