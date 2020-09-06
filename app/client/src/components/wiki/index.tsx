import AddWiki from "./addwiki";
import * as enums from "../../enums";
import React, { useState } from "react";
import EditWikiPage from "./editwikipage";
import { useSelector } from "react-redux";
import { AppState } from "../../reducers";
import DeleteWikiModal from "./deletewiki";
import EditWikiFolder from "./editwikifolder";
import Dropdown from "react-bootstrap/esm/Dropdown";
import localeHelper from "../../utils/localehelper";
import DropdownButton from "react-bootstrap/DropdownButton";

const WikiPage: React.FC = () => {
  const selectedWiki = useSelector(
    (state: AppState) => state.data.selectedWiki
  );
  const wikiData = useSelector((state: AppState) => state.data.wikiData);
  const [doShowDeleteModal, setShowDeleteModal] = useState(false);
  const [doShowAddNewModal, setShowAddNewModal] = useState(false);
  const [doShowEditWikiPageModal, setShowEditWikiPageModal] = useState(false);
  const [doShowEditWikiFolderModal, setShowEditWikiFolderModal] = useState(
    false
  );

  const onAddNewClick = () => {
    setShowAddNewModal(true);
  };

  const onEditWikiClick = () => {
    if (selectedWiki?.type === enums.wikiType.page) {
      setShowEditWikiPageModal(true);
    } else {
      setShowEditWikiFolderModal(true);
    }
  };

  const onDeleteWikiClick = () => {
    setShowDeleteModal(true);
  };

  const hideDeleteWikiModal = () => {
    setShowDeleteModal(false);
  };

  const hideAddWikiModal = () => {
    setShowAddNewModal(false);
  };

  const hideWikiPageEditModal = () => {
    setShowEditWikiPageModal(false);
  };

  const hideWikiFolderEditModal = () => {
    setShowEditWikiFolderModal(false);
  };

  const getWikiContent = () => {
    const data = wikiData?.length
      ? wikiData[1]
      : localeHelper.translate("pages.wiki.default-content");
    return { __html: data };
  };

  const getWikiTitle = () => {
    if (wikiData && wikiData.length) {
      return wikiData[0];
    }

    return localeHelper.translate("pages.wiki.default-title");
  };

  return (
    <React.Fragment>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 font-weight-normal">
          {getWikiTitle()}
        </h1>
        <DropdownButton id="dropdown-basic-button" title="Actions" size="sm">
          <Dropdown.Item onClick={onEditWikiClick}>
            {localeHelper.translate("pages.wiki.edit-btn")}
          </Dropdown.Item>
          <Dropdown.Item onClick={onAddNewClick}>
            {localeHelper.translate("pages.wiki.add-new-btn")}
          </Dropdown.Item>
          <Dropdown.Item
            className="dropdown-danger"
            onClick={onDeleteWikiClick}
          >
            {localeHelper.translate("pages.wiki.delete-btn")}
          </Dropdown.Item>
        </DropdownButton>
        <AddWiki
          isOpen={doShowAddNewModal}
          onSaveClick={hideAddWikiModal}
          onCancelClick={hideAddWikiModal}
        />
        <EditWikiPage
          isOpen={doShowEditWikiPageModal}
          onSaveClick={hideWikiPageEditModal}
          onCancelClick={hideWikiPageEditModal}
        />
        <EditWikiFolder
          isOpen={doShowEditWikiFolderModal}
          onSaveClick={hideWikiFolderEditModal}
          onCancelClick={hideWikiFolderEditModal}
        />
        <DeleteWikiModal
          isOpen={doShowDeleteModal}
          onDeleteClick={hideDeleteWikiModal}
          onCancelClick={hideDeleteWikiModal}
        />
      </div>
      <div dangerouslySetInnerHTML={getWikiContent()}></div>
    </React.Fragment>
  );
};

export default WikiPage;
