import { useState } from "react";

import './ContactModal.scss';
// import QuestionsService from "../../services/QuestionsService";
import Modal from "components/Modal/Modal";
import FormInput from "components/FormInput/FormInput";

const ContactModal = ({ toggleModal }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const modalTitle = () => {
    return !success ? "Don't be shy, drop us a line!" : null;
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleMessageChange = (value) => {
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(!event.target.checkValidity()) return;

    // const body = {
    //   email: email,
    //   body: message
    // };

    try {
      // await QuestionsService.send_question(body);
      setSuccess(true);
    } catch (error) {
      const { response: {data: {errors}} } = error;
      alert(errors.full_messages[0]);
    }
  };

  return (
    <Modal toggleModal={toggleModal} title={modalTitle()}>
      {
        success ? (
          <div className="contact-modal-success">
            <h2 className="contact-modal-success-title">Thanks for getting in touch!</h2>
            <p className="contact-modal-success-text">We&apos;ll get back to you as soon as we can.</p>
          </div>
        ) : (
          <form className="contact-modal-form" onSubmit={handleSubmit}>
            <FormInput
              type="email"
              id="email"
              name="email"
              label="Email *"
              onChange={handleEmailChange}
              value={email}
              required={true}
            />

            <FormInput
              type="textarea"
              id="message"
              name="message"
              label="Message *"
              onChange={handleMessageChange}
              value={message}
              required={true}
            />

            <button type="submit" id="submit-contact-form" className="btn">
              Send
            </button>
          </form>
        )
      }
    </Modal>
  );
};

export default ContactModal;
