import smiles from "assets/smilies.svg";
import Navbar from "components/Navbar/Navbar";
import LandingVideo from "components/LandingVideo/LandingVideo";

import "components/SignUpConfirm/SignUpConfirm.scss";

const SignUpConfirm = () => (
  <div className="sign-up-confirm">
    <section className="sign-up-confirm__container">
      <Navbar className="white" />

      <div className="sign-up-confirm__content">
        <img src={smiles} alt="smiles" />
        <p className="sign-up-confirm__yey">Yey!</p>
        <p className="sign-up-confirm__step">
          Only one more step to start enjoying
        </p>
        <p className="sign-up-confirm__title">target</p>
        <p className="sign-up-confirm__account">
          We’ve sent an email to confirm your account.
          <br />
          Please check your inbox.
        </p>
      </div>
    </section>

    <LandingVideo />
  </div>
);

export default SignUpConfirm;
