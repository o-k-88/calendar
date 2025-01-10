import Button from "../Button/Button";

const ModalFooter = ({ clickFirst, clickSecondary, textFirst, textSecondary, children }) => {
  return (
    <div className="modal-footer">
      {children}
      {textFirst && (
        <Button underlineView onClick={clickFirst}>
          {textFirst}
        </Button>
      )}
      {textSecondary && (
        <Button underlineView onClick={clickSecondary}>
          {textSecondary}
        </Button>
      )}
    </div>
  );
};

export default ModalFooter;
