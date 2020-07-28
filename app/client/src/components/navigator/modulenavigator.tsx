import Login from "../auth/login";
import * as enums from "../../enums";
import ContentWrapper from "../wrapper";
import React, { useEffect } from "react";
import { AppState } from "../../reducers";
import Header from "../../components/header";
import { useSelector, connect } from "react-redux";
import { loadLocaleFile } from "../../actions/locale";

interface Props {
  loadLocaleFile: Function;
}

const ModuleNavigator: React.FunctionComponent<Props> = (props) => {
  const auth = useSelector((state: AppState) => state.auth);
  const langCode = useSelector((state: AppState) => state.locale.code);

  const renderModules = () => {
    if (langCode) {
      if (auth.token && auth.status === enums.AuthStatus.success) {
        return (
          <React.Fragment>
            <Header />
            <ContentWrapper />
          </React.Fragment>
        );
      } else {
        return <Login />;
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
};

export default connect(null, mapDispatchToProps)(ModuleNavigator);
