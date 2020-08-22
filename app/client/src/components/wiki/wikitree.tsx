import React from "react";
import * as enums from "../../enums";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import { Wiki } from "../../models/wiki";
import { AppState } from "../../reducers";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpenTwoTone";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import { setExpandedWikis, setSelectedWiki } from "../../actions/wiki";

interface Props {
  className: string;
  wikis?: Wiki[];
  expandedWikiIds?: string[];
  selectedWikiId?: string[];
  setExpandedWikis: Function;
  setSelectedWiki: Function;
}

const WikiTree: React.FC<Props> = (props) => {
  const TextIcon = (props: SvgIconProps) => {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 18, height: 18 }} {...props}>
        <path d="M14.17,5L19,9.83V19H5V5L14.17,5L14.17,5 M14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 c0-0.53-0.21-1.04-0.59-1.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3L14.17,3z M7,15h10v2H7V15z M7,11h10v2H7V11z M7,7h7v2H7V7z" />
      </SvgIcon>
    );
  };

  const constructTree = (wikis: Wiki[]) => {
    return wikis.map((wiki) => {
      const endIcon =
        wiki.type === enums.wikiType.folder && !wiki.children ? (
          <FolderIcon />
        ) : null;

      return (
        <TreeItem
          key={wiki.id}
          nodeId={wiki.id!}
          label={wiki.title}
          endIcon={endIcon}
        >
          {wiki.children && wiki.children.length
            ? constructTree(wiki.children)
            : undefined}
        </TreeItem>
      );
    });
  };

  const onNodeSelect = (e: React.ChangeEvent<{}>, nodeIds: string[]) => {
    console.log(nodeIds);
    props.setSelectedWiki(nodeIds);
  };

  const onNodeToggle = (e: React.ChangeEvent<{}>, nodeIds: string[]) => {
    props.setExpandedWikis(nodeIds);
  };

  return props.wikis ? (
    <TreeView
      selected={props.selectedWikiId}
      className={props.className}
      defaultCollapseIcon={<FolderOpenIcon />}
      defaultExpandIcon={<FolderIcon />}
      defaultEndIcon={<TextIcon />}
      defaultExpanded={props.expandedWikiIds}
      onNodeSelect={onNodeSelect}
      onNodeToggle={onNodeToggle}
    >
      {constructTree(props.wikis)}
    </TreeView>
  ) : (
    <Spinner id="spinner-wiki" color="blue" spinnerCount={5} size="small" />
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    expandedWikiIds: state.data.expandedWikiIds,
    selectedWikiIds: state.data.selectedWikiId,
  };
};

const mapDispatchToProps = {
  setExpandedWikis,
  setSelectedWiki,
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiTree);
