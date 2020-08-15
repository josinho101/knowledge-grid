import React from "react";
import * as enums from "../../enums";
import { Wiki } from "../../models/wiki";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpenTwoTone";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

interface Props {
  className: string;
  wikis?: Wiki[];
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
        <TreeItem nodeId={wiki.id} label={wiki.title} endIcon={endIcon}>
          {wiki.children && wiki.children.length
            ? constructTree(wiki.children)
            : undefined}
        </TreeItem>
      );
    });
  };

  return (
    <TreeView
      className={props.className}
      defaultCollapseIcon={<FolderOpenIcon />}
      defaultExpandIcon={<FolderIcon />}
      defaultEndIcon={<TextIcon />}
    >
      {props.wikis ? constructTree(props.wikis) : null}
    </TreeView>
  );
};

export default WikiTree;
