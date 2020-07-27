import auth, { Auth } from "./auth";
import { combineReducers } from "redux";
import locale, { Locale } from "./locale";

export interface AppState {
  auth: Auth;
  locale: Locale;
}

export default combineReducers<AppState>({
  auth,
  locale,
});
