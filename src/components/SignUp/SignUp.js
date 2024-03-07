import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserService from 'services/UserService';
import Navbar from 'components/Navbar/Navbar';
import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import LandingVideo from 'components/LandingVideo/LandingVideo';
import SignUpConfirm from 'components/SignUpConfirm/SignUpConfirm';

import 'components/SignUp/SignUp.scss';

const GENDER_OPTIONS = ['male', 'female'];

const SignUp = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [gender, setGender] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!event.target.checkValidity()) return;

    const body = {
      user: {
        first_name: name,
        email: email,
        gender: gender,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    };

    try {
      await UserService.signUp(body);
      setSuccess(true);
    } catch (error) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      alert(errors.full_messages[0]);
    }
  }

  if (success) {
    return <SignUpConfirm />;
  }

  return (
    <div className="sign-up">
      <section className="sign-up__container">
        <Navbar className="white" />

        <h1 className="sign-up__title">{t('signUp.title')}</h1>

        <form className="sign-up__form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            id="name"
            name="name"
            label={t('signUp.name')}
            value={name}
            onChange={setName}
            required={true}
          />

          <FormInput
            type="email"
            id="email"
            name="email"
            label={t('signUp.email')}
            value={email}
            onChange={setEmail}
            required={true}
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            label={t('signUp.password')}
            placeholder={t('signUp.passwordPlaceholder')}
            value={password}
            onChange={setPassword}
            minLength="6"
            required={true}
          />

          <FormInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            label={t('signUp.passwordConfirmation')}
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            minLength="6"
            required={true}
          />

          <FormSelect
            id="gender"
            name="gender"
            label={t('signUp.gender')}
            options={GENDER_OPTIONS}
            placeholder={t('signUp.genderPlaceholder')}
            value={gender}
            onChange={setGender}
            required={true}
          />

          <button type="submit" className="sign-up__submit btn">
            {t('signUp.submit')}
          </button>
        </form>

        <Link to="/" className="sign-up__email-login">
          {t('signUp.login')}
        </Link>
      </section>

      <LandingVideo />
    </div>
  );
};

export default SignUp;
