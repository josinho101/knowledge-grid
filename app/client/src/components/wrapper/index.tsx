import React from "react";
import Footer from "../footer";
import SplitPane from "react-split-pane";
import Header from "../../components/header";
import WikiNavigator from "../navigator/wikinavigator";

const ContentWrapper: React.FC<{}> = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div className="content-wrapper">
        <SplitPane
          split="vertical"
          minSize={100}
          defaultSize={250}
          maxSize={500}
          className="split-pane"
        >
          <WikiNavigator />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" className="content-wrapper-container">
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
