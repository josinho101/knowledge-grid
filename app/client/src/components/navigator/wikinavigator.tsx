import Anchor from "../common/anchor";
import WikiTree from "../wiki/wikitree";
import { Wiki } from "../../models/wiki";
import React, { useEffect } from "react";
import { AppState } from "../../reducers";
import { getWikiTree } from "../../actions/wiki";
import { useSelector, connect } from "react-redux";
import localeHelper from "../../utils/localehelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  getWikiTree: Function;
  wiki?: Wiki;
}

const WikiNavigator: React.FC<Props> = (props) => {
  const token = useSelector((state: AppState) => state.auth.token);

  useEffect(() => {
    if (!props.wiki) {
      props.getWikiTree(token);
    }
  });

  return (
    <div className="sidebar sidebar-light accordion m-2">
      <div className="wiki-nav-controls">
        <Anchor
          id="btnExpand"
          className="wiki-nav-btn"
          title={localeHelper.translate("pages.wiki.controls.expand-btn")}
        >
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "expand"]}
            className={"fa-fw"}
          />
        </Anchor>
        <Anchor
          id="btnCollapse"
          className="wiki-nav-btn"
          title={localeHelper.translate("pages.wiki.controls.collapse-btn")}
        >
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "compress"]}
            className={"fa-fw"}
          />
        </Anchor>
      </div>
      <WikiTree className="treeview-nav" wikis={props.wiki?.children} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    wiki: state.data.wikiTree,
  };
};

const mapDispatchToProps = {
  getWikiTree,
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiNavigator);
