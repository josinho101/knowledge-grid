import React from "react";
import Footer from "../footer";
import Header from "../../components/header";
import SiteNavigator from "../navigator/sitenavigator";
import WikiNavigator from "../navigator/wikinavigator";
import SplitPane from "react-split-pane";

const ContentWrapper: React.FC<{}> = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div className="content-wrapper">
        <SplitPane
          split="vertical"
          minSize={100}
          defaultSize={200}
          maxSize={500}
        >
          <WikiNavigator />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <div className="container-fluid">{props.children}</div>
            </div>
            <Footer />
          </div>
        </SplitPane>
      </div>
    </React.Fragment>
  );
};

export default ContentWrapper;
