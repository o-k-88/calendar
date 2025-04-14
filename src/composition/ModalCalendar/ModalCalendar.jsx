import Modal from "../../components/Modal/Modal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalBody from "../../components/Modal/ModalBody";
import ModalFooter from "../../components/Modal/ModalFooter";
import ModalClose from "../../components/Modal/ModalClose";
import Button from "../../components/Button/Button";

import "./ModalCalendar.scss";

import { API_HOST } from "../../const";

const ModalCalendar = (props) => {
  const { onClose, isOpen, data, currentUserUid } = props;

  const isEdit = data.uid && data.uid === currentUserUid;
  // const isEdit = true;

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
                <span className="modal-calendar-label">🗂️ Category:</span>
                <span className="modal-calendar-value">{data?.category}</span>
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
                  {new Date(data?.currentDate).toLocaleDateString()} {data?.time}
                </span>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter
          textSecondary={"Close"}
          // clickFirst={`https://hybridcal.dev.sunyempire.edu${data.path}`}
          // textFirst={"Edit"}
          clickSecondary={onClose}
        >
          {isEdit && (
            <Button
              href={`${API_HOST}${data.path}`}
              className="modal-button"
              rel="noopener noreferrer"
            >
              Edit
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </ModalWrapper>
  );
};

export default ModalCalendar;
