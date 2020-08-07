import AddWiki from "./addwiki";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/esm/Dropdown";
import localeHelper from "../../utils/localehelper";
import DropdownButton from "react-bootstrap/DropdownButton";
import { DropdownItemProps } from "react-bootstrap/esm/DropdownItem";

const WikiPage: React.FC = () => {
  const [doShowAddNewModal, setShowAddNewModal] = useState(false);

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

  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800 font-weight-normal">Wiki Title</h1>
      <DropdownButton id="dropdown-basic-button" title="Actions" size="sm">
        <Dropdown.Item>
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
    </div>
  );
};

export default WikiPage;
