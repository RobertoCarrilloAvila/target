import { useTranslation } from 'react-i18next';

import useContentView from 'hooks/useContentView';
import COMPONENT_NAMES from 'constants/Components';

import 'components/Profile/Profile.scss';
import profile from 'assets/profile.png';

const Profile = () => {
  const { t } = useTranslation();
  const { goTo } = useContentView();

  return (
    <div className="profile">
      <div className="profile__container">
        <img src={profile} alt="avatar" className="profile__avatar" />
        <h1 className="profile__name">cbrum</h1>
        <div className="profile__actions">
          <button
            className="profile__edit profile__btn"
            onClick={() => goTo(COMPONENT_NAMES.EDIT_PROFILE)}
          >
            {t('profile.editProfile')}
          </button>
          <span className="profile__slash">/</span>
          <button className="profile__logout profile__btn">
            {t('profile.logout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
