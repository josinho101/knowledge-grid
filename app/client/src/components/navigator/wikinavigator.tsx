import * as enums from "../../enums";
import Anchor from "../common/anchor";
import WikiTree from "../wiki/wikitree";
import { Wiki } from "../../models/wiki";
import React, { useEffect } from "react";
import { AppState } from "../../reducers";
import { useSelector, connect } from "react-redux";
import localeHelper from "../../utils/localehelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWikiTree, collapseAll, expandAll } from "../../actions/wiki";

interface Props {
  wiki?: Wiki;
  getWikiTree: Function;
  collapseAll: Function;
  expandAll: Function;
}

const WikiNavigator: React.FC<Props> = (props) => {
  const token = useSelector((state: AppState) => state.auth.token);

  useEffect(() => {
    if (!props.wiki) {
      props.getWikiTree(token);
    }
  });

  const getWikiFolderIds = (wiki?: Wiki, folderIds: string[] = []) => {
    if (wiki && wiki.children) {
      const folders = wiki.children.filter(
        (i) => i.type === enums.wikiType.folder
      );

      if (folders && folders.length) {
        folders.forEach((folder: Wiki) => {
          folderIds.push(folder.id!);
          getWikiFolderIds(folder, folderIds);
        });
      }
    }

    return folderIds;
  };

  const onExpandClicked = () => {
    const wikiIds = getWikiFolderIds(props.wiki, []);
    props.expandAll(wikiIds);
  };

  const onCollapseClicked = () => {
    props.collapseAll();
  };

  return (
    <div className="sidebar sidebar-light accordion m-2">
      <div className="wiki-nav-controls">
        <Anchor
          id="btnExpand"
          className="wiki-nav-btn"
          title={localeHelper.translate("pages.wiki.controls.expand-btn")}
          onClick={onExpandClicked}
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
          onClick={onCollapseClicked}
        >
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "compress"]}
            className={"fa-fw"}
          />
        </Anchor>
      </div>
      <WikiTree
        className="treeview-nav"
        wikis={props.wiki?.children}
        doEnablePageSelection={true}
      />
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
  collapseAll,
  expandAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiNavigator);
