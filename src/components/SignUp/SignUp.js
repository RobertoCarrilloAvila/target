import { Link } from "react-router-dom";

import Navbar from "components/Navbar/Navbar";
import FormInput from "components/FormInput/FormInput";
import LandingVideo from "components/LandingVideo/LandingVideo";
import "./SignUp.scss";

const SignUp = () => {
  return (
    <div className="sign-up">
      <section className="container">
        <Navbar className="white" />

        <h1 id="sign-up-title">Sign Up</h1>

        <form className="sign-up-form">
          <FormInput
            type="text"
            id="name"
            name="name"
            label="Name"
          />

          <FormInput
            type="email"
            id="email"
            name="email"
            label="Email"
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            label="Password"
          />

          <FormInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            label="Confirm Password"
          />

          <button type="submit" id="sign-up-submit" className="btn">
            Sign Up
          </button>
        </form>

        <Link to="/" className="email-login">Sign In</Link>
      </section>

      <LandingVideo />
    </div>
  );
};

export default SignUp;
