import smiles from "../../assets/smilies.svg";
import Navbar from "components/Navbar/Navbar";
import LandingVideo from "components/LandingVideo/LandingVideo";

import "./SignUpConfirm.scss";

const SignUpConfirm = () => (
  <div className="sign-up-confirm">
    <section className="container">
      <Navbar className="white" />

      <div className="sign-up-content">
        <img src={smiles} alt="smiles" />
        <h3 className="sign-up-yey">Yey!</h3>
        <p className="sign-up-step">Only one more step to start enjoying</p>
        <h2 className="sign-up-title">target</h2>
        <p className="sign-up-confirm-account">
          We’ve sent an email to confirm your account.<br />
          Please check your inbox.
        </p>
      </div>
    </section>

    <LandingVideo />
  </div>
);

export default SignUpConfirm;
