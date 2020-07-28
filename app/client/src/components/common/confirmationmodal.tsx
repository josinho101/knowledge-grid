import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
  id: string;
  isOpen: boolean;
  title: string;
  content: string;
  secondaryButtonText: string;
  primaryButtonText: string;
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

const ConfirmationModal: React.FunctionComponent<Props> = (props) => {
  return (
    <Modal show={props.isOpen} onHide={props.closeButtonClickHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.secondaryButtonClickHandler}>
          {props.secondaryButtonText}
        </Button>
        <Button variant="danger" onClick={props.primaryButtonClickHandler}>
          {props.primaryButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
