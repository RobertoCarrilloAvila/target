import { useTranslation } from 'react-i18next';

import smiles from "../../assets/smilies.svg";
import Navbar from "components/Navbar/Navbar";
import LandingVideo from "components/LandingVideo/LandingVideo";

import "./SignUpConfirm.scss";

const SignUpConfirm = () => {
  const { t } = useTranslation();

  return (
    <div className="sign-up-confirm">
      <section className="container">
        <Navbar className="white" />

        <div className="sign-up-content">
          <img src={smiles} alt="smiles" />
          <h3 className="sign-up-yey">{t("sign-up-confirm.yey")}</h3>
          <p className="sign-up-step">{t("sign-up-confirm.subtitle")}</p>
          <h2 className="sign-up-title">{t("sign-up-confirm.title")}</h2>
          <p className="sign-up-confirm-account">
            {t("sign-up-confirm.instruction1")}
            <br />
            {t("sign-up-confirm.instruction2")}
          </p>
        </div>
      </section>

      <LandingVideo />
    </div>
  );
};

export default SignUpConfirm;
