import Modal from "../../components/Modal/Modal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalBody from "../../components/Modal/ModalBody";
import ModalFooter from "../../components/Modal/ModalFooter";
import ModalClose from "../../components/Modal/ModalClose";
import Button from "../../components/Button/Button";

import "./ModalOngoingEvents.scss";

const ModalOngoingEvents = (props) => {
  const { onClose, isOpen, data } = props;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} isOutside>
      <Modal className="modal-calendar">
        <ModalHeader>
          <ModalClose onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          {data && (
            <div className="modal-calendar-card">
              <div className="modal-calendar-row">
                <span className="modal-calendar-label">🏷️ Title:</span>
                <span className="modal-calendar-value">{data?.title}</span>
              </div>
              <div className="modal-calendar-row">
                <span className="modal-calendar-label">📝 Description:</span>
                <span
                  className="modal-calendar-value"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                ></span>
              </div>
              <div className="modal-calendar-row">
                <span className="modal-calendar-label">📅 Date / Time:</span>
                <span className="modal-calendar-value">
                  {new Date(data?.field_start_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter textSecondary={"Close"} clickSecondary={onClose}></ModalFooter>
      </Modal>
    </ModalWrapper>
  );
};

export default ModalOngoingEvents;
