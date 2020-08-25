import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
  id: string;
  isOpen: boolean;
  title: string;
  size?: "lg";
  dialogClassName?: string;
  bodyClassName?: string;
  secondaryButtonText: string;
  primaryButtonText: string;
  disablePrimaryButton?: boolean;
  closeButtonClickHandler: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  secondaryButtonClickHandler: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  primaryButtonClickHandler: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}

const CommonModal: React.FunctionComponent<Props> = (props) => {
  return (
    <Modal
      size={props.size}
      show={props.isOpen}
      dialogClassName={props.dialogClassName}
      onHide={props.closeButtonClickHandler}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={props.bodyClassName}>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="sm"
          onClick={props.secondaryButtonClickHandler}
        >
          {props.secondaryButtonText}
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={props.primaryButtonClickHandler}
          disabled={props.disablePrimaryButton}
        >
          {props.primaryButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommonModal;
