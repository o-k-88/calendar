import Button from "../Button/Button";

const ModalFooter = ({ clickFirst, clickSecondary, textFirst, textSecondary, children }) => {
  return (
    <div className="modal-footer">
      <div className="modal-buttons">
        {children}
        {textFirst && (
          <Button className="modal-button" underlineView onClick={clickFirst}>
            {textFirst}
          </Button>
        )}
        {textSecondary && (
          <Button className="modal-button" underlineView onClick={clickSecondary}>
            {textSecondary}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModalFooter;
