import WikiTree from "../wiki/wikitree";
import React, { useEffect } from "react";
import { AppState } from "../../reducers";
import { getWikiTree } from "../../actions/wiki";
import { useSelector, connect } from "react-redux";

interface Props {
  getWikiTree: Function;
}

const WikiNavigator: React.FC<Props> = (props) => {
  const token = useSelector((state: AppState) => state.auth.token);

  useEffect(() => {
    props.getWikiTree(token);
  }, []);

  return (
    <div className="sidebar sidebar-light accordion m-2">
      <WikiTree className="treeview-nav" />
    </div>
  );
};

const mapDispatchToProps = {
  getWikiTree,
};

export default connect(undefined, mapDispatchToProps)(WikiNavigator);
