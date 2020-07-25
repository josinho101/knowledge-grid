import React from "react";
import Login from "../auth/login";
import ContentWrapper from "../wrapper";
import { useSelector } from "react-redux";
import { AppState } from "../../reducers";
import Header from "../../components/header";

const ModuleNavigator: React.FunctionComponent = () => {
  const auth = useSelector((state: AppState) => state.auth);
  return auth.token && auth.isAuthenticated ? (
    <React.Fragment>
      <Header />
      <ContentWrapper />
    </React.Fragment>
  ) : (
    <Login />
  );
};

export default ModuleNavigator;
