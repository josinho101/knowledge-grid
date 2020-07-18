import React from "react";
import LeftNavigator from "../navigator/leftnavigator";

const ContentWrapper: React.FunctionComponent = () => {
  return (
    <div className="content-wrapper">
      <LeftNavigator />
      <div id="content-wrapper" className="d-flex flex-column"></div>
    </div>
  );
};

export default ContentWrapper;
