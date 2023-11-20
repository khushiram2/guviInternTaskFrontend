import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap"
import PropTypes from "prop-types"
export const InfoModal = ({show,handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose} >
        <ModalHeader>
            Info About Auth
        </ModalHeader>
        <ModalBody>
            <p>Here i have set up a otp functionality with nodemailer
                only try to register with a real email where you can get a Otp.  
                else click on fill details button to fill the details automatically </p>
        </ModalBody>
        <ModalFooter>
            <Button onClick={handleClose}  >Close</Button>
        </ModalFooter>
    </Modal>
  )
}

InfoModal.propTypes={
    show:PropTypes.bool.isRequired,
    handleClose:PropTypes.func.isRequired
}