import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import QuestionsService from 'services/questionsService';
import Modal from 'components/Modal/Modal';
import FormInput from 'components/FormInput/FormInput';

import './ContactModal.scss';

const ContactModal = ({ toggleModal }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const modalTitle = () => {
    return !success ? t('contactModal.title') : null;
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleMessageChange = (value) => {
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) return;

    const body = {
      email: email,
      body: message,
    };

    try {
      await QuestionsService.send_question(body);
      setSuccess(true);
    } catch (error) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      alert(errors.full_messages[0]);
    }
  };

  return (
    <Modal toggleModal={toggleModal} title={modalTitle()}>
      {success ? (
        <div className="contact-modal__success">
          <h2 className="contact-modal__success-title">
            {t('contactModal.successTitle')}
          </h2>
          <p className="contact-modal__success-text">
            {t('contactModal.successText')}
          </p>
        </div>
      ) : (
        <form className="contact-modal__form" onSubmit={handleSubmit}>
          <FormInput
            type="email"
            id="email"
            name="email"
            label={t('contactModal.email')}
            onChange={handleEmailChange}
            value={email}
            required={true}
          />

          <FormInput
            type="textarea"
            id="message"
            name="message"
            label={t('contactModal.message')}
            onChange={handleMessageChange}
            value={message}
            required={true}
          />

          <button type="submit" className="contact-modal__form-submit btn">
            {t('contactModal.submit')}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default ContactModal;
