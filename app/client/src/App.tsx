import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import IconLibrary from "./components/icons/iconlibrary";
import { BrowserRouter as Router } from "react-router-dom";
import ModuleNavigator from "./components/navigator/modulenavigator";

const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <IconLibrary />
      <Provider store={store}>
        <Router>
          <ModuleNavigator />
        </Router>
      </Provider>
    </React.Fragment>
  );
};

export default App;
