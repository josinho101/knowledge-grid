import React from "react";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ContentWrapper from "./components/wrapper";
import IconLibrary from "./components/icons/iconlibrary";

const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <IconLibrary />
      <Header />
      <ContentWrapper />
    </React.Fragment>
  );
};

export default App;
