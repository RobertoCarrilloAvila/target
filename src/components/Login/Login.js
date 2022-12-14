import { useState } from "react";

import smiles from "../../assets/smilies.svg";
import UserService from "../../services/userService";
import Navbar from "components/Navbar/Navbar";
import LandingVideo from "components/LandingVideo/LandingVideo";
import FormInput from "components/FormInput/FormInput";
import "./Login.scss";


const Login = () => {
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
          <h2>Target MVD</h2>
        </div>

        <p className="login-header-text">
          <span>Find people near you & Connect</span>
          Create a target wherever on the map, specify your interest: Travel,
          Dating, Music, etc and start conecting with others who share your
          interest.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <FormInput
            type="email"
            id="email"
            name="email"
            label="Email"
            onChange={handleEmailChange}
            value={email}
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            label="Password"
            onChange={handlePasswordChange}
            value={password}
          />

          <button type="submit" id="login-submit" className="btn">
            Sign In
          </button>
        </form>

        <a className="forgot-password" href="/">
          Forgot your password?
        </a>

        <a id="facebook-signup" href="/sign_up">connect with facebook</a>
        <a className="email-signup" href="/sign_up">
          Sign up
        </a>
      </section>

      <LandingVideo />
    </div>
  );
};

export default Login;
