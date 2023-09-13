import { useState } from "react";

import './ContactModal.scss';
import Modal from "components/Modal/Modal";
import FormInput from "components/FormInput/FormInput";

const ContactModal = ({ toggleModal }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleMessageChange = (value) => {
    setMessage(value);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form className="contact-modal-form">
        <FormInput
          type="email"
          id="email"
          name="email"
          label="Email *"
          onChange={handleEmailChange}
          value={email}
        />

        <FormInput
          type="textarea"
          id="message"
          name="message"
          label="Message *"
          onChange={handleMessageChange}
          value={message}
        />

        <button type="submit" id="submit-contact-form" className="btn">
          Send
        </button>
      </form>
    </Modal>
  );
};

export default ContactModal;
