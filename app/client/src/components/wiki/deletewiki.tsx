import React from "react";
import { AppState } from "../../reducers";
import { deleteWiki } from "../../actions/wiki";
import { useSelector, connect } from "react-redux";
import localeHelper from "../../utils/localehelper";
import ConfirmationModal from "../common/confirmationmodal";

interface Props {
  isOpen: boolean;
  deleteWiki: Function;
  onDeleteClick: Function;
  onCancelClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const DeleteWikiModal: React.FC<Props> = (props) => {
  const token = useSelector((state: AppState) => state.auth.token);
  const selectedWiki = useSelector(
    (state: AppState) => state.data.selectedWiki
  );

  const onDeleteClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    props.deleteWiki(token, selectedWiki?.id);
    props.onDeleteClick();
  };

  const getContent = () => {
    const content = localeHelper.translate("pages.wiki.delete-modal.content");
    return `${content} ${selectedWiki?.title}`;
  };

  return (
    <ConfirmationModal
      id="delete-wiki-modal"
      isOpen={props.isOpen}
      content={getContent()}
      primaryButtonText={localeHelper.translate(
        "pages.wiki.delete-modal.delete-btn"
      )}
      secondaryButtonText={localeHelper.translate(
        "pages.wiki.delete-modal.cancel-btn"
      )}
      primaryButtonClickHandler={onDeleteClick}
      secondaryButtonClickHandler={props.onCancelClick}
      closeButtonClickHandler={props.onCancelClick}
      title={localeHelper.translate("pages.wiki.delete-modal.title")}
    />
  );
};

const mapDispatchToProps = {
  deleteWiki,
};

export default connect(undefined, mapDispatchToProps)(DeleteWikiModal);
