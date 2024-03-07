import { useTranslation } from 'react-i18next';

import smiles from 'assets/smilies.svg';
import Navbar from 'components/Navbar/Navbar';
import LandingVideo from 'components/LandingVideo/LandingVideo';

import 'components/SignUpConfirm/SignUpConfirm.scss';

const SignUpConfirm = () => {
  const { t } = useTranslation();

  return (
    <div className="sign-up-confirm">
      <section className="sign-up-confirm__container">
        <Navbar className="white" />

        <div className="sign-up-confirm__content">
          <img src={smiles} alt="smiles" />
          <p className="sign-up-confirm__yey">{t('signUpConfirm.title')}</p>
          <p className="sign-up-confirm__step">{t('signUpConfirm.step')}</p>
          <p className="sign-up-confirm__title">{t('signUpConfirm.target')}</p>
          <p className="sign-up-confirm__account">
            {t('signUpConfirm.emailSent')}
            <br />
            {t('signUpConfirm.checkInbox')}
          </p>
        </div>
      </section>

      <LandingVideo />
    </div>
  );
};

export default SignUpConfirm;
