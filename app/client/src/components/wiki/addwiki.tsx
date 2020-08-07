import React from "react";
import WikiTree from "./wikitree";
import CommonModal from "../common/commonmodal";
import localeHelper from "../../utils/localehelper";
import Textbox from "../common/textbox";

interface Props {
  isOpen: boolean;
  onCancelClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onSaveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const AddWiki: React.FC<Props> = (props) => {
  return (
    <CommonModal
      size="lg"
      isOpen={props.isOpen}
      id="add-new-wiki-modal"
      closeButtonClickHandler={props.onCancelClick}
      primaryButtonClickHandler={props.onSaveClick}
      secondaryButtonClickHandler={props.onCancelClick}
      primaryButtonText={localeHelper.translate(
        "pages.wiki.add-new-modal.save-btn"
      )}
      secondaryButtonText={localeHelper.translate(
        "pages.wiki.add-new-modal.cancel-btn"
      )}
      title={localeHelper.translate("pages.wiki.add-new-modal.title")}
    >
      <div className="wiki-add-container">
        <div className="wiki-add-left-pane">
          <WikiTree className="treeview-modal" />
        </div>
        <div className="wiki-add-right-pane">
          <div className="form-group">
            <label className="col-form-label">Parent - &nbsp;</label>
            <b>Selected wiki folder</b>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default AddWiki;
