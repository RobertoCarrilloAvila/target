import { useState } from "react";
import { useTranslation } from 'react-i18next';

import smiles from "../../assets/smilies.svg";
import UserService from "../../services/userService";

import Navbar from "components/Navbar/Navbar";
import LandingVideo from "components/LandingVideo/LandingVideo";
import FormInput from "components/FormInput/FormInput";

import "./Login.scss";


const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    await UserService.login({
      user: {
        email: email,
        password: password,
      },
    });
  }

  return (
    <div className="login">
      <section className="container">
        <Navbar className="white" />

        <div className="login-header-img">
          <img src={smiles} alt="smiles" />
          <h2>{t('login.title')}</h2>
        </div>

        <p className="login-header-text">
          <span>{t("login.header-subtitle")}</span>
          {t("login.header-description")}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <FormInput
            type="email"
            id="email"
            name="email"
            label={t("login.email")}
            onChange={handleEmailChange}
            value={email}
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            label={t("login.password")}
            onChange={handlePasswordChange}
            value={password}
          />

          <button type="submit" id="login-submit" className="btn">
            {t("login.sign-in")}
          </button>
        </form>

        <a className="forgot-password" href="/">
          {t("login.forgot-password")}
        </a>

        <a id="facebook-signup" href="/sign_up">{t("login.connect-with-facebook")}</a>
        <a className="email-signup" href="/sign_up">
          {t("login.sign-up")}
        </a>
      </section>

      <LandingVideo />
    </div>
  );
};

export default Login;
