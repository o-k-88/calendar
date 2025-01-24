import Modal from "../../components/Modal/Modal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalBody from "../../components/Modal/ModalBody";
import ModalFooter from "../../components/Modal/ModalFooter";
import ModalClose from "../../components/Modal/ModalClose";

import "./ModalCalendar.scss";

const ModalCalendar = (props) => {
	const {onClose, isOpen, data} = props;
	
	return (
		<ModalWrapper isOpen={isOpen} onClose={onClose} isOutside>
			<Modal className="modal-calendar">
				<ModalHeader>
					<ModalClose onClick={onClose}/>
				</ModalHeader>
				<ModalBody>
					{data && (
						<div>
							<h4 className="modal-calendar-title">{data.title}</h4>
							<p className="modal-calendar-date">{data.time}</p>
							
							<p
								className="modal-calendar-description"
								dangerouslySetInnerHTML={{__html: data.description}}
							/>
							<p className="modal-calendar-category"> {data?.category}</p>
						</div>
					)}
				</ModalBody>
				<ModalFooter textSecondary={"Close"} clickSecondary={onClose}/>
			</Modal>
		</ModalWrapper>
	);
};

export default ModalCalendar;
