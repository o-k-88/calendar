import cn from "classnames"
import PropTypes from 'prop-types'

const Modal = ({children, className}) => {
  return (
    <div className={cn("modal modal-wrapper", className)}>
      <div className="modal-box">{children}</div>
    </div>
  )
}

Modal.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
}

export default Modal