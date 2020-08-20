import React from "react";
import WikiTree from "./wikitree";
import * as enums from "../../enums";
import Textbox from "../common/textbox";
import { Wiki } from "../../models/wiki";
import { AppState } from "../../reducers";
import Checkbox from "../common/checkbox";
import CommonModal from "../common/commonmodal";
import { useSelector, connect } from "react-redux";
import localeHelper from "../../utils/localehelper";

interface Props {
  isOpen: boolean;
  wiki?: Wiki;
  onCancelClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onSaveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const AddWiki: React.FC<Props> = (props) => {
  const selectedWikiId = useSelector(
    (state: AppState) => state.data.selectedWikiId
  );

  const findWiki = (wikiId: string, tree?: Wiki): Wiki | undefined => {
    if (tree && tree.children) {
      const folders = tree.children.filter(
        (i) => i.type === enums.wikiType.folder
      );

      if (folders) {
        const result = folders.filter((i) => i.id === wikiId);
        if (result && result.length > 0) {
          return result[0];
        } else {
          for (let i = 0; i < folders.length; i++) {
            return findWiki(wikiId, folders[i]);
          }
        }
      }
    }
  };

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
          <WikiTree className="treeview-modal" wikis={props.wiki?.children} />
        </div>
        <div className="wiki-add-right-pane">
          <div className="form-group">
            <label className="col-form-label">
              {localeHelper.translate("pages.wiki.add-new-modal.parent")} -
              &nbsp;
            </label>
            <b>{}</b>
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
                    className="btn btn-outline-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {localeHelper.translate(
                      "pages.wiki.add-new-modal.wiki-type-dropdown.none"
                    )}
                  </a>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <a className="dropdown-item" href="#">
                      {localeHelper.translate(
                        "pages.wiki.add-new-modal.wiki-type-dropdown.folder"
                      )}
                    </a>
                    <a className="dropdown-item" href="#">
                      {localeHelper.translate(
                        "pages.wiki.add-new-modal.wiki-type-dropdown.page"
                      )}
                    </a>
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
            <Textbox id="wiki-title" type="text" className="form-control" />
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
    selectedWikiId: state.data.selectedWikiId,
  };
};

export default connect(mapStateToProps, undefined)(AddWiki);
