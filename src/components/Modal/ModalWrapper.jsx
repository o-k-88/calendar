import "./Modal.scss";

const ModalWrapper = ({ children, isOpen, handleClose, isOutside }) => {
  const handleOutside = (e) => {
    if (isOutside && !e.target.closest(".modal")) {
      handleClose();
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
