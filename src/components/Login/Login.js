import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PrivatePaths from 'components/Constants/PrivatePaths';

import smiles from 'assets/smilies.svg';
import UserService from 'services/UserService';
import Navbar from 'components/Navbar/Navbar';
import LandingVideo from 'components/LandingVideo/LandingVideo';
import FormInput from 'components/FormInput/FormInput';
import 'components/Login/Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAuthError, setHasAuthError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      navigate(PrivatePaths.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <h2>Target MVD</h2>
        </div>

        <p className="login__header-text">
          <span>Find people near you & Connect</span>
          Create a target wherever on the map, specify your interest: Travel,
          Dating, Music, etc and start conecting with others who share your
          interest.
        </p>

        {hasAuthError && (
          <p className="login__header-error-message">
            Invalid login credentials. Please try again.
          </p>
        )}

        <form className="login__form" onSubmit={handleSubmit}>
          <FormInput
            type="email"
            id="email"
            name="email"
            label="Email"
            onChange={handleEmailChange}
            value={email}
            error={hasAuthError}
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            label="Password"
            onChange={handlePasswordChange}
            value={password}
            error={hasAuthError}
          />

          <button type="submit" className="login__submit btn">
            Sign In
          </button>
        </form>

        <a className="login__forgot-password" href="/">
          Forgot your password?
        </a>

        <a className="login__facebook-signup" href="/sign_up">
          connect with facebook
        </a>
        <a className="login__email-signup" href="/sign_up">
          Sign up
        </a>
      </section>

      <LandingVideo />
    </div>
  );
};

export default Login;
