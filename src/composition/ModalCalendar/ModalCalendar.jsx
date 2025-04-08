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
            <div>
              <h4 className="modal-calendar-title">{data.title}</h4>
              <p className="modal-calendar-date">{data.time}</p>

              <p
                className="modal-calendar-description"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
              <p className="modal-calendar-category"> {data?.category}</p>
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
            // <a
            //   className="button button-edit"
            //   rel="noopener noreferrer"
            //   href={`${API_HOST}${data.path}`}
            // >
            //   Edit
            // </a>
            <Button
              href={`${API_HOST}${data.path}`}
              className="button-edit"
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
