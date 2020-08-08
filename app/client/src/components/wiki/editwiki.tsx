import Spinner from "../common/spinner";
import React, { useState } from "react";
import CommonModal from "../common/commonmodal";
import localeHelper from "../../utils/localehelper";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
  isOpen: boolean;
  onCancelClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onSaveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const EditWiki: React.FC<Props> = (props) => {
  const [doShowLoader, setShowLoader] = useState(true);

  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
  };

  return (
    <CommonModal
      isOpen={props.isOpen}
      id="edit-wiki-modal"
      dialogClassName="wiki-edit-modal"
      bodyClassName="wiki-edit-modal-body"
      closeButtonClickHandler={props.onCancelClick}
      primaryButtonClickHandler={props.onSaveClick}
      secondaryButtonClickHandler={props.onCancelClick}
      primaryButtonText={localeHelper.translate(
        "pages.wiki.edit-modal.save-btn"
      )}
      secondaryButtonText={localeHelper.translate(
        "pages.wiki.edit-modal.cancel-btn"
      )}
      title="<--- Wiki title goes here --->"
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

export default EditWiki;
