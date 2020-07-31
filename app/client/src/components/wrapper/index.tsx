import React from "react";
import Footer from "../footer";
import Header from "../../components/header";
import SiteNavigator from "../navigator/sitenavigator";

const ContentWrapper: React.FC<{}> = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div className="content-wrapper">
        <SiteNavigator />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">{props.children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContentWrapper;
