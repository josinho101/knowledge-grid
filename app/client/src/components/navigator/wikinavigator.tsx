import WikiTree from "../wiki/wikitree";
import { Wiki } from "../../models/wiki";
import React, { useEffect } from "react";
import { AppState } from "../../reducers";
import { getWikiTree } from "../../actions/wiki";
import { useSelector, connect } from "react-redux";

interface Props {
  getWikiTree: Function;
  wiki: Wiki;
}

const WikiNavigator: React.FC<Props> = (props) => {
  const token = useSelector((state: AppState) => state.auth.token);

  useEffect(() => {
    props.getWikiTree(token);
  }, []);

  return (
    <div className="sidebar sidebar-light accordion m-2">
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
