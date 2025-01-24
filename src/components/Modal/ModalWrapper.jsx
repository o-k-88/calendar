import "./Modal.scss";

const ModalWrapper = ({ children, isOpen, onClose, isOutside }) => {
  const handleOutside = (e) => {
    if (isOutside && !e.target.closest(".modal")) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div onClick={(e) => handleOutside(e)} className="modal-wrapper-box">
          {children}
        </div>
      )}
    </>
  );
};

// ModalWrapper.defaultProps = {isOpen: false}

export default ModalWrapper;
