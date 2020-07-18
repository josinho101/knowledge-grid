import React from "react";
import SiteNavigator from "../navigator/sitenavigator";
import Footer from "../footer";

const ContentWrapper: React.FunctionComponent = () => {
  return (
    <div className="content-wrapper">
      <SiteNavigator />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid"></div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ContentWrapper;
