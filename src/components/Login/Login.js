import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PrivatePaths from 'constants/PrivatePaths';

import smiles from 'assets/smilies.svg';
import UserService from 'services/UserService';
import Navbar from 'components/Navbar/Navbar';
import LandingVideo from 'components/LandingVideo/LandingVideo';
import FormInput from 'components/FormInput/FormInput';
import 'components/Login/Login.scss';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAuthError, setHasAuthError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      navigate(PrivatePaths.HOME);
    }
  }, [navigate]);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const loggedIn = await UserService.login(email, password);
    if (loggedIn) {
      navigate(PrivatePaths.HOME);
    } else {
      setHasAuthError(true);
    }
  }

  return (
    <div className="login">
      <section className="login__container">
        <Navbar className="white" />

        <div className="login__header-img">
          <img src={smiles} alt="smiles" />
          <h2>{t('login.title')}</h2>
        </div>

        <p className="login__header-text">
          <span>{t('login.subtitle')}</span>
          {t('login.description')}
        </p>

        {hasAuthError && (
          <p className="login__header-error-message">
            {t('login.credentialError')}
          </p>
        )}

        <form className="login__form" onSubmit={handleSubmit}>
          <FormInput
            type="email"
            id="email"
            name="email"
            label={t('login.email')}
            onChange={handleEmailChange}
            value={email}
            error={hasAuthError}
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            label={t('login.password')}
            onChange={handlePasswordChange}
            value={password}
            error={hasAuthError}
          />

          <button type="submit" className="login__submit btn">
            {t('login.signIn')}
          </button>
        </form>

        <a className="login__forgot-password" href="/">
          {t('login.forgotPassword')}
        </a>

        <a className="login__facebook-signup" href="/sign_up">
          {t('login.facebookSignUp')}
        </a>
        <a className="login__email-signup" href="/sign_up">
          {t('login.signUp')}
        </a>
      </section>

      <LandingVideo />
    </div>
  );
};

export default Login;
