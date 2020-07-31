import Users from "../user";
import Login from "../auth/login";
import * as enums from "../../enums";
import Dashboard from "../dashboard";
import ContentWrapper from "../wrapper";
import React, { useEffect } from "react";
import { AppState } from "../../reducers";
import { Switch, Route } from "react-router";
import { retryAuth } from "../../actions/auth";
import { useSelector, connect } from "react-redux";
import { loadLocaleFile } from "../../actions/locale";

interface Props {
  loadLocaleFile: Function;
  retryAuth: Function;
}

const ModuleNavigator: React.FunctionComponent<Props> = (props) => {
  const auth = useSelector((state: AppState) => state.auth);
  const langCode = useSelector((state: AppState) => state.locale.code);

  const renderModules = () => {
    if (langCode) {
      if (auth.doRetryAuth) {
        // try authenticate token
        let retryCount = auth.retryCount || 0;
        props.retryAuth(auth.token, retryCount);
      } else {
        if (auth.token && auth.status === enums.AuthStatus.success) {
          return (
            <ContentWrapper>
              <Switch>
                <Route path="/users" component={Users} />
                <Route path="/" component={Dashboard} />
              </Switch>
            </ContentWrapper>
          );
        } else {
          return <Login />;
        }
      }
    }

    return null;
  };

  useEffect(() => {
    props.loadLocaleFile();
  }, []);

  return renderModules();
};

const mapDispatchToProps = {
  loadLocaleFile,
  retryAuth,
};

export default connect(null, mapDispatchToProps)(ModuleNavigator);
