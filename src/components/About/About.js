import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import smiles from "../../assets/smilies.svg";
import Navbar from "components/Navbar/Navbar";
import LandingVideo from "components/LandingVideo/LandingVideo";

import "./About.scss";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <section className="container">
        <Navbar className="white" />

        <div className="about-header-img">
          <img src={smiles} alt="smiles" />
          <h2>{t("about.title")}</h2>
        </div>

        <p className="about-description" role="contentinfo">
          {t("about.description")}
        </p>

        <Link to="/" id="about-get-start" className="btn">{t("about.get-start")}</Link>
      </section>

      <LandingVideo />
    </div>
  );
};

export default About;
