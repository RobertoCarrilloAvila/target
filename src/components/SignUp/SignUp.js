import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

import UserService from "../../services/userService";
import Navbar from "components/Navbar/Navbar";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import LandingVideo from "components/LandingVideo/LandingVideo";
import SignUpConfirm from "components/SignUpConfirm/SignUpConfirm";

import "./SignUp.scss";

const SignUp = () => {
  const { t } = useTranslation();

  const GENDER_OPTIONS = ["male", "female"];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [gender, setGender] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if(!event.target.checkValidity()) return;

    const body = {
      user: {
        first_name: name,
        email: email,
        gender: gender,
        password: password,
        password_confirmation: passwordConfirmation
      }
    };

    try {
      await UserService.signUp(body);
      setSuccess(true);
    } catch (error) {
      const { response: {data: {errors}} } = error;
      alert(errors.full_messages[0]);
    }
  };

  if (success) {
    return <SignUpConfirm />;
  }

  return (
    <div className="sign-up">
      <section className="container">
        <Navbar className="white" />

        <h1 id="sign-up-title">{t("sign-up.title")}</h1>

        <form className="sign-up-form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            id="name"
            name="name"
            label={t("sign-up.name")}
            value={name}
            onChange={setName}
            required={true}
          />

          <FormInput
            type="email"
            id="email"
            name="email"
            label={t("sign-up.email")}
            value={email}
            onChange={setEmail}
            required={true}
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            label={t("sign-up.password")}
            placeholder="min. 6 characters long"
            value={password}
            onChange={setPassword}
            minLength="6"
            required={true}
          />

          <FormInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            label={t("sign-up.confirm-password")}
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            minLength="6"
            required={true}
          />

          <FormSelect
            id="gender"
            name="gender"
            label={t("sign-up.gender")}
            options={GENDER_OPTIONS}
            placeholder="select your gender"
            value={gender}
            onChange={setGender}
            required={true}
          />

          <button type="submit" id="sign-up-submit" className="btn">
            {t("sign-up.submit")}
          </button>
        </form>

        <Link to="/" className="email-login">{t("sign-up.login")}</Link>
      </section>

      <LandingVideo />
    </div>
  );
};

export default SignUp;
