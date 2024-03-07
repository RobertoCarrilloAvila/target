import { useTranslation } from 'react-i18next';
import smiles from 'assets/smilies.svg';
import Navbar from 'components/Navbar/Navbar';
import LandingVideo from 'components/LandingVideo/LandingVideo';

import './About.scss';
import { Link } from 'react-router-dom';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <section className="about__container">
        <Navbar className="white" />

        <div className="about__header-img">
          <img src={smiles} alt="smiles" />
          <h2>{t('about.title')}</h2>
        </div>

        <p className="about__description" role="contentinfo">{t('about.description')}</p>

        <Link to="/" className="btn about__get-start">{t('about.getStarted')}</Link>
      </section>

      <LandingVideo />
    </div>
  );
};

export default About;
