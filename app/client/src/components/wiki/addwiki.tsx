import WikiTree from "./wikitree";
import * as enums from "../../enums";
import Anchor from "../common/anchor";
import React, { useState } from "react";
import Textbox from "../common/textbox";
import { Wiki } from "../../models/wiki";
import { AppState } from "../../reducers";
import Checkbox from "../common/checkbox";
import { saveWiki } from "../../actions/wiki";
import CommonModal from "../common/commonmodal";
import { useSelector, connect } from "react-redux";
import localeHelper from "../../utils/localehelper";

interface Props {
  isOpen: boolean;
  wiki?: Wiki;
  saveWiki: Function;
  onCancelClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onSaveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const AddWiki: React.FC<Props> = (props) => {
  const [wikiType, setWikiType] = useState(0);
  const [wikiTitle, setWikiTitle] = useState("");
  const token = useSelector((state: AppState) => state.auth.token);
  const selectedWiki = useSelector(
    (state: AppState) => state.data.selectedWiki
  );

  const enableSave = () => {
    return wikiType != 0 && wikiTitle !== undefined && wikiTitle.trim() !== "";
  };

  const onWikiTypeClick = (type: enums.wikiType) => {
    setWikiType(type);
  };

  const onWikiTitleChange = (title: string) => {
    setWikiTitle(title);
  };

  const onCancelClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setWikiTitle("");
    setWikiType(0);
    props.onCancelClick(e);
  };

  const onSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const wiki: Wiki = {
      title: wikiTitle,
      type: wikiType,
      parentId: selectedWiki?.id,
    };
    props.saveWiki(wiki, token);
    props.onSaveClick(e);
  };

  const getWikiTypeTitle = (type: enums.wikiType) => {
    switch (type) {
      case enums.wikiType.folder:
        return localeHelper.translate(
          "pages.wiki.add-new-modal.wiki-type-dropdown.folder"
        );
      case enums.wikiType.page:
        return localeHelper.translate(
          "pages.wiki.add-new-modal.wiki-type-dropdown.page"
        );
      default:
        return localeHelper.translate(
          "pages.wiki.add-new-modal.wiki-type-dropdown.none"
        );
    }
  };

  return (
    <CommonModal
      size="lg"
      isOpen={props.isOpen}
      id="add-new-wiki-modal"
      closeButtonClickHandler={onCancelClick}
      primaryButtonClickHandler={onSaveClick}
      secondaryButtonClickHandler={onCancelClick}
      primaryButtonText={localeHelper.translate(
        "pages.wiki.add-new-modal.save-btn"
      )}
      secondaryButtonText={localeHelper.translate(
        "pages.wiki.add-new-modal.cancel-btn"
      )}
      title={localeHelper.translate("pages.wiki.add-new-modal.title")}
      disablePrimaryButton={!enableSave()}
    >
      <div className="wiki-add-container">
        <div className="wiki-add-left-pane">
          <WikiTree className="treeview-modal" wikis={props.wiki?.children} />
        </div>
        <div className="wiki-add-right-pane">
          <div className="form-group">
            <label className="col-form-label">
              {localeHelper.translate("pages.wiki.add-new-modal.parent")} -
              &nbsp;
            </label>
            <b>{selectedWiki?.title}</b>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label className="col-form-label">
                  {localeHelper.translate("pages.wiki.add-new-modal.wiki-type")}
                </label>
              </div>
              <div className="col">
                <div className="dropdown">
                  <a
                    className="btn btn-outline-secondary dropdown-toggle dropdown-120p"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {getWikiTypeTitle(wikiType)}
                  </a>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <Anchor
                      className="dropdown-item"
                      href="#"
                      onClick={() => onWikiTypeClick(enums.wikiType.folder)}
                    >
                      {getWikiTypeTitle(enums.wikiType.folder)}
                    </Anchor>
                    <Anchor
                      className="dropdown-item"
                      href="#"
                      onClick={() => onWikiTypeClick(enums.wikiType.page)}
                    >
                      {getWikiTypeTitle(enums.wikiType.page)}
                    </Anchor>
                  </div>
                </div>
              </div>
              <div className="col"></div>
              <div className="col"></div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-form-label">
              {localeHelper.translate("pages.wiki.add-new-modal.wiki-title")}
            </label>
            <Textbox
              id="wiki-title"
              type="text"
              className="form-control"
              maxLength={100}
              onChange={(e) => {
                onWikiTitleChange(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <div className="m-4">
              <Checkbox
                id="rememberMe"
                label={localeHelper.translate(
                  "pages.wiki.add-new-modal.edit-on-save"
                )}
                className="custom-control-input"
                labelClassName="custom-control-label"
              />
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    wiki: state.data.wikiTree,
  };
};

const mapDispatchToProps = {
  saveWiki,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWiki);
