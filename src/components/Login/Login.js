import "./Login.scss";

import Navbar from "../Navbar/Navbar";
import LandingVideo from "../LandingVideo/LandingVideo";
import FormInput from "../FormInput/FormInput";
import { useState } from "react";

import smiles from "../../assets/smilies.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const requestParams = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "user": { 
            "email": email, 
            "password": password
        }
      })
    };

    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/users/sign_in`, requestParams);
    // const data = await response.json();
    const headers = response.headers;

    sessionStorage.setItem("access-token", headers.get("access-token"));
    sessionStorage.setItem("client", headers.get("client"));
    sessionStorage.setItem("expiry", headers.get("expiry"));
    sessionStorage.setItem("uid", headers.get("uid"));
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

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

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

        <a className="forgot-password" href="#">
          Forgot your password?
        </a>

        <a id="facebook-signup">connect with facebook</a>
        <a className="email-signup" href="#">
          Sign up
        </a>
      </section>

      <LandingVideo />
    </div>
  );
};

export default Login;
