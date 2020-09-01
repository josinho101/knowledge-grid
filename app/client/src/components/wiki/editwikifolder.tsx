import React, { useState } from "react";
import Textbox from "../common/textbox";
import { Wiki } from "../../models/wiki";
import { AppState } from "../../reducers";
import { updateWiki } from "../../actions/wiki";
import CommonModal from "../common/commonmodal";
import { useSelector, connect } from "react-redux";
import localeHelper from "../../utils/localehelper";

interface Props {
  updateWiki: Function;
  isOpen: boolean;
  onCancelClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onSaveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const EditWikiFolder: React.FC<Props> = (props) => {
  const selectedWiki = useSelector(
    (state: AppState) => state.data.selectedWiki
  );
  const [wikiTitle, setWikiTitle] = useState(selectedWiki?.title);
  const token = useSelector((state: AppState) => state.auth.token);

  const onCancelClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setWikiTitle(selectedWiki?.title);
    props.onCancelClick(e);
  };

  const onSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const wiki: Wiki = {
      id: selectedWiki?.id,
      title: wikiTitle,
    };
    props.updateWiki(token, wiki, true);
    props.onSaveClick(e);
  };

  const disableSaveButton = () => {
    return !wikiTitle && wikiTitle === "";
  };

  return (
    <CommonModal
      isOpen={props.isOpen}
      id="edit-wiki-modal-folder"
      closeButtonClickHandler={onCancelClick}
      primaryButtonClickHandler={onSaveClick}
      secondaryButtonClickHandler={onCancelClick}
      disablePrimaryButton={disableSaveButton()}
      primaryButtonText={localeHelper.translate(
        "pages.wiki.edit-modal.save-btn"
      )}
      secondaryButtonText={localeHelper.translate(
        "pages.wiki.edit-modal.cancel-btn"
      )}
      title={localeHelper.translate("pages.wiki.edit-modal.title")}
    >
      <div className="form-group">
        <label className="col-form-label">
          {localeHelper.translate("pages.wiki.add-new-modal.wiki-title")}
        </label>
        <Textbox
          id="wiki-title"
          type="text"
          className="form-control"
          maxLength={100}
          value={wikiTitle}
          autocomplete={false}
          onChange={(e) => {
            setWikiTitle(e.target.value);
          }}
        />
      </div>
    </CommonModal>
  );
};

const mapDispatchToProps = {
  updateWiki,
};

export default connect(undefined, mapDispatchToProps)(EditWikiFolder);
