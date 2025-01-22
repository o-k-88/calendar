import Modal from "../Modal/Modal";
import ModalWrapper from "../Modal/ModalWrapper";
import ModalHeader from "../Modal/ModalHeader";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalClose from "../Modal/ModalClose";

import "./ModalCalendar.scss";

const ModalCalendar = (props) => {
  const { handleClose, isOpen, data, children } = props;

  return (
    <ModalWrapper isOpen={isOpen} handleClose={handleClose} isOutside>
      <Modal className="modal-calendar">
        <ModalHeader>
          <ModalClose onClick={handleClose} />
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
        <ModalFooter textSecondary={"Close"} clickSecondary={handleClose} />
      </Modal>
    </ModalWrapper>
  );
};

export default ModalCalendar;
