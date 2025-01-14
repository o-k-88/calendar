import React from "react";
import Modal from "../Modal/Modal";
import ModalWrapper from "../Modal/ModalWrapper";
import ModalHeader from "../Modal/ModalHeader";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalClose from "../Modal/ModalClose";

import "./ModalCreateEvent.scss";
import { FormCreateEvent } from "../../composition/FormCreateEvent/FormCreateEvent";

const ModalCreateEvent = ({ isOpen, handleClose, data }) => {
  return (
    <ModalWrapper isOpen={isOpen} isOutside handleClose={handleClose}>
      <Modal className={"modal-create-event"}>
        <ModalHeader>
          <ModalClose onClick={handleClose} />
        </ModalHeader>
        <ModalBody>
          <h1>Create Calendar Event</h1>
          <FormCreateEvent />
        </ModalBody>
      </Modal>
    </ModalWrapper>
  );
};

export default ModalCreateEvent;
