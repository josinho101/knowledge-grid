import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ContentWrapper from "./components/wrapper";
import IconLibrary from "./components/icons/iconlibrary";

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <IconLibrary />
      <Header />
      <ContentWrapper />
    </Provider>
  );
};

export default App;
