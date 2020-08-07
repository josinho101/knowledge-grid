import React from "react";
import WikiTree from "../wiki/wikitree";

const WikiNavigator: React.FunctionComponent = () => {
  return (
    <div className="sidebar sidebar-light accordion m-2">
      <WikiTree className="treeview-nav" />
    </div>
  );
};

export default WikiNavigator;
