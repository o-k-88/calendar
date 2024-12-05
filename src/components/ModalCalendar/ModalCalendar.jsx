import Modal from "../Modal/Modal";
import ModalWrapper from "../Modal/ModalWrapper";
import ModalHeader from "../Modal/ModalHeader";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalClose from "../Modal/ModalClose";

import "./ModalCalendar.scss";

const ModalCalendar = (props) => {
  const { handleClose, isOpen, data, children, handleOk } = props;

  return (
    <ModalWrapper isOpen={isOpen} handleClose={handleClose} isOutside>
      <Modal className="modal-calendar">
        <ModalHeader>
          <ModalClose onClick={handleClose} />
        </ModalHeader>
        <ModalBody>
          {/* {data.map((item, index) => (
            <div key={index}>
              <h4>{item.title}</h4>
              <p>{item.id}</p>
              <p>{item.time}</p>

              <p dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
          ))} */}
          {data && (
            <div>
              <h4>{data.title}</h4>
              <p>{data.time}</p>

              <p dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          )}
        </ModalBody>
        <ModalFooter
          // textFirst={"OK"}
          textSecondary={"Close"}
          // clickFirst={handleOk}
          clickSecondary={handleClose}
        />
      </Modal>
    </ModalWrapper>
  );
};

export default ModalCalendar;
