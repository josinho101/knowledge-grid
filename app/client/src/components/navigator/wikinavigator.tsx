import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpenTwoTone";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const WikiNavigator: React.FunctionComponent = () => {
  function TextIcon(props: SvgIconProps) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 18, height: 18 }} {...props}>
        <path d="M14.17,5L19,9.83V19H5V5L14.17,5L14.17,5 M14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 c0-0.53-0.21-1.04-0.59-1.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3L14.17,3z M7,15h10v2H7V15z M7,11h10v2H7V11z M7,7h7v2H7V7z" />
      </SvgIcon>
    );
  }

  return (
    <div className="sidebar sidebar-light accordion m-2">
      <TreeView
        className="treeview"
        defaultCollapseIcon={<FolderOpenIcon />}
        defaultExpandIcon={<FolderIcon />}
        defaultEndIcon={<TextIcon />}
      >
        <TreeItem nodeId="1" label="Sentinel">
          <TreeItem nodeId="2" label="Overview" />
          <TreeItem nodeId="3" label="Who is this for?" />
          <TreeItem nodeId="4" label="Modules">
            <TreeItem nodeId="4.1" label="Library">
              <TreeItem nodeId="4.1.1" label="Assets" />
              <TreeItem nodeId="4.1.2" label="Question items" />
            </TreeItem>
            <TreeItem nodeId="4.2" label="Testlets">
              <TreeItem nodeId="4.2.1" label="What are testlets" />
              <TreeItem nodeId="4.2.2" label="How to create testlets" />
            </TreeItem>
            <TreeItem nodeId="4.3" label="Tests">
              <TreeItem nodeId="4.3.1" label="How to configure tests" />
            </TreeItem>
            <TreeItem nodeId="4.4" label="Users">
              <TreeItem nodeId="4.4.1" label="How to create users" />
              <TreeItem nodeId="4.4.2" label="Add roles and permissions" />
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="5" label="Arch diagrams">
            <TreeItem nodeId="5.1" label="Overview diagram" />
            <TreeItem nodeId="5.2" label="Flow diagram" />
            <TreeItem nodeId="5.3" label="Database diagram" />
            <TreeItem nodeId="5.4" label="State diagram" />
            <TreeItem nodeId="5.5" label="Dataflow diagram" />
          </TreeItem>
          <TreeItem nodeId="6" label="FAQs">
            <TreeItem nodeId="6.1" label="What is this software?" />
            <TreeItem nodeId="6.2" label="Who all can use this?" />
            <TreeItem nodeId="6.3" label="How many users can it support?" />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default WikiNavigator;
