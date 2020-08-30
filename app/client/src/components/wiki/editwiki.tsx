import Spinner from "../common/spinner";
import React, { useState } from "react";
import { Wiki } from "../../models/wiki";
import { AppState } from "../../reducers";
import { updateWiki } from "../../actions/wiki";
import CommonModal from "../common/commonmodal";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, connect } from "react-redux";
import localeHelper from "../../utils/localehelper";

interface Props {
  updateWiki: Function;
  isOpen: boolean;
  onCancelClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onSaveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const EditWiki: React.FC<Props> = (props) => {
  const [doShowLoader, setShowLoader] = useState(true);
  const [wikiContent, setWikiContent] = useState("");
  const token = useSelector((state: AppState) => state.auth.token);
  const selectedWiki = useSelector(
    (state: AppState) => state.data.selectedWiki
  );

  const handleEditorChange = (content: any, editor: any) => {
    setWikiContent(content);
  };

  const onCancelClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setWikiContent("");
    props.onCancelClick(e);
  };

  const onSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const wiki: Wiki = {
      id: selectedWiki?.id,
      content: wikiContent,
    };
    props.updateWiki(token, wiki);
    props.onSaveClick(e);
  };

  const getWikiTitle = () => {
    return selectedWiki ? selectedWiki.title! : "";
  };

  return (
    <CommonModal
      isOpen={props.isOpen}
      id="edit-wiki-modal"
      dialogClassName="wiki-edit-modal"
      bodyClassName="wiki-edit-modal-body"
      closeButtonClickHandler={onCancelClick}
      primaryButtonClickHandler={onSaveClick}
      secondaryButtonClickHandler={onCancelClick}
      primaryButtonText={localeHelper.translate(
        "pages.wiki.edit-modal.save-btn"
      )}
      secondaryButtonText={localeHelper.translate(
        "pages.wiki.edit-modal.cancel-btn"
      )}
      title={getWikiTitle()}
    >
      {doShowLoader ? (
        <Spinner id="mce-loader" color="blue" size="small" />
      ) : null}
      <Editor
        onInit={() => {
          setShowLoader(false);
        }}
        init={{
          height: 450,
          branding: false,
          menubar: false,
          resize: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor forecolor | \
        table |alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | fullscreen",
        }}
        initialValue=""
        onEditorChange={handleEditorChange}
      />
    </CommonModal>
  );
};

const mapDispatchToProps = {
  updateWiki,
};

export default connect(undefined, mapDispatchToProps)(EditWiki);
