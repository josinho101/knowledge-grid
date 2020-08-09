import AddWiki from "./addwiki";
import EditWiki from "./editwiki";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/esm/Dropdown";
import localeHelper from "../../utils/localehelper";
import DropdownButton from "react-bootstrap/DropdownButton";
import { DropdownItemProps } from "react-bootstrap/esm/DropdownItem";

const WikiPage: React.FC = () => {
  const [doShowAddNewModal, setShowAddNewModal] = useState(false);
  const [doShowEditModal, setShowEditModal] = useState(false);

  const onAddNewClick = (
    e: React.MouseEvent<DropdownItemProps, MouseEvent>
  ) => {
    setShowAddNewModal(true);
  };

  const onCancelClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setShowAddNewModal(false);
  };

  const onSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setShowAddNewModal(false);
  };

  const onEditClick = (e: React.MouseEvent<DropdownItemProps, MouseEvent>) => {
    setShowEditModal(true);
  };

  const onEditCancelClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setShowEditModal(false);
  };

  const onEditSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setShowEditModal(false);
  };

  return (
    <React.Fragment>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 font-weight-normal">
          {localeHelper.translate("pages.wiki.default-title")}
        </h1>
        <DropdownButton id="dropdown-basic-button" title="Actions" size="sm">
          <Dropdown.Item onClick={onEditClick}>
            {localeHelper.translate("pages.wiki.edit-btn")}
          </Dropdown.Item>
          <Dropdown.Item onClick={onAddNewClick}>
            {localeHelper.translate("pages.wiki.add-new-btn")}
          </Dropdown.Item>
        </DropdownButton>
        <AddWiki
          isOpen={doShowAddNewModal}
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
        />
        <EditWiki
          isOpen={doShowEditModal}
          onSaveClick={onEditSaveClick}
          onCancelClick={onEditCancelClick}
        />
      </div>
      <p>{localeHelper.translate("pages.wiki.default-content")}</p>
    </React.Fragment>
  );
};

export default WikiPage;
