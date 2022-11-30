import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

import UserService from "../../services/userService";
import Navbar from "components/Navbar/Navbar";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import LandingVideo from "components/LandingVideo/LandingVideo";

import "./SignUp.scss";

const SignUp = () => {
  const GENDER_OPTIONS = ["male", "female"];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [gender, setGender] = useState("");
  const [redirect, setRedirect] = useState(false);

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
      setRedirect(true);
    } catch (error) {
      const { response: {data: {errors}} } = error;
      alert(errors.full_messages[0]);
    }
  };

  if (redirect) {
    return <Navigate to="/" />
  }else{

    return (
      <div className="sign-up">
        <section className="container">
          <Navbar className="white" />
  
          <h1 id="sign-up-title">Sign Up</h1>
  
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <FormInput
              type="text"
              id="name"
              name="name"
              label="name"
              value={name}
              onChange={setName}
              required={true}
            />
  
            <FormInput
              type="email"
              id="email"
              name="email"
              label="email"
              value={email}
              onChange={setEmail}
              required={true}
            />
  
            <FormInput
              type="password"
              id="password"
              name="password"
              label="password"
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
              label="confirm password"
              value={passwordConfirmation}
              onChange={setPasswordConfirmation}
              minLength="6"
              required={true}
            />
  
            <FormSelect
              id="gender"
              name="gender"
              label="gender"
              options={GENDER_OPTIONS}
              placeholder="select your gender"
              value={gender}
              onChange={setGender}
              required={true}
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
  }
};

export default SignUp;
