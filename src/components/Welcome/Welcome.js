import { useTranslation } from 'react-i18next';

import useContentView from 'hooks/useContentView';
import COMPONENT_NAMES from 'components/Constants/Components';

import smiles from 'assets/smilies.svg';
import 'components/Welcome/Welcome.scss';

const Welcome = () => {
  const { t } = useTranslation();
  const { goTo } = useContentView();

  return (
    <div className="welcome">
      <img src={smiles} className="welcome__img" alt="smiles" />
      <h1 className="welcome__title">
        {t('welcome.welcome')}{' '}
        <strong className="welcome--bold">{t('welcome.target')}</strong>
      </h1>
      <h2 className="welcome__subtitle">{t('welcome.subtitle')}</h2>

      <ul className="welcome__instructions-text">
        <li>{t('welcome.instructions')}</li>
        <li>
          <strong className="welcome--bold">{t('welcome.target')}</strong>{' '}
          {t('welcome.instructions2')}
        </li>
      </ul>

      <button
        className="welcome__button btn"
        onClick={() => goTo(COMPONENT_NAMES.CHAT)}
      >
        {t('welcome.submit')}
      </button>
    </div>
  );
};

export default Welcome;
