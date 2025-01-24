import React from "react";
import Modal from "../../components/Modal/Modal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalBody from "../../components/Modal/ModalBody";
import ModalFooter from "../../components/Modal/ModalFooter";
import ModalClose from "../../components/Modal/ModalClose";

import "./ModalCreateEvent.scss";
import { FormCreateEvent } from "../FormCreateEvent/FormCreateEvent";

const ModalCreateEvent = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} isOutside onClose={onClose}>
      <Modal className={"modal-create-event"}>
        <ModalHeader>
          <ModalClose onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <h1 className="modal-create-event-title">Create Calendar Event</h1>
          <FormCreateEvent onClose={onClose} />
        </ModalBody>
      </Modal>
    </ModalWrapper>
  );
};

export default ModalCreateEvent;
