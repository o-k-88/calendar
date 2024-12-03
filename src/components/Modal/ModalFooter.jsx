import Button from "../Button/Button"

const ModalFooter = ({clickFirst, clickSecondary, textFirst, textSecondary}) => {
    return (
        <div className="modal-footer">
            {textFirst && <Button onClick={clickFirst}>{textFirst}</Button>}
            {textSecondary &&  <Button underlineView onClick={clickSecondary}>{textSecondary}</Button>}
        </div>
    )
  }
  
  export default ModalFooter