import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserService from 'services/UserService';
import NavbarLeftButton from 'components/NavbarLeftButton/NavbarLeftButton';

import 'components/Navbar/Navbar.scss';
import pinBlack from 'assets/icons/pin_black.svg';
import pinWhite from 'assets/icons/pin_white.svg';
import ContactModal from 'components/ContactModal/ContactModal';
import PublicPaths from 'components/Constants/PublicPaths';

const backgroundColors = {
  BLUE: 'blue',
  WHITE: 'white',
};

const Navbar = ({ color, leftButton }) => {
  const { t } = useTranslation();
  const [showmenu, setShowMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isLoggedIn] = useState(UserService.isLoggedIn());
  const [leftAction, setLeftAction] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(color);
  const navigate = useNavigate();

  const assignBackgroundColor = useCallback(() => {
    if (color == backgroundColors.BLUE || leftButton == 'back') {
      return backgroundColors.BLUE;
    } else {
      return backgroundColors.WHITE;
    }
  }, [color, leftButton]);

  useEffect(() => {
    setBackgroundColor(assignBackgroundColor());
    setLeftAction(leftButton);
  }, [color, leftButton, assignBackgroundColor]);

  const toggleMenu = () => {
    setShowMenu(!showmenu);
  };

  const toggleContactModal = () => {
    setShowMenu(false);
    setShowContactModal(!showContactModal);
  };

  const showMap = () => {
    setBackgroundColor(backgroundColors.BLUE);
    setLeftAction('back');
  };

  const handleLogout = async () => {
    if (await UserService.logOut()) {
      navigate(PublicPaths.ROOT);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  const isNavbarBlue = () => {
    return backgroundColor == backgroundColors.BLUE;
  };

  return (
    <nav className={`navbar navbar--${backgroundColor}`}>
      <NavbarLeftButton
        action={leftAction}
        isNavbarBlue={isNavbarBlue}
        backgroundColors={backgroundColors}
        setNavbarBackgroundColor={setBackgroundColor}
        toggleMenu={toggleMenu}
      />

      {showmenu && (
        <div className="navbar__collapsible-menu">
          <ul className="navbar__menu">
            <li className="navbar__menu-item">
              <Link to="/about" className="navbar__link">
                {t('navbar.about')}
              </Link>
            </li>
            <li className="navbar__menu-item">
              <button
                onClick={toggleContactModal}
                className="navbar__link"
              >
                {t('navbar.contact')}
              </button>
            </li>
            <li className="navbar__menu-item">
              {isLoggedIn && (
                <button
                  className="navbar__link"
                  onClick={handleLogout}
                >
                  {t('navbar.logout')}
                </button>
              )}
            </li>
          </ul>
        </div>
      )}

      {showContactModal && <ContactModal toggleModal={toggleContactModal} />}

      <h1 className="navbar__item navbar__title">TARGET</h1>
      <button onClick={showMap} className='navbar__pin'>
        <img
          className={`navbar__item`}
          src={isNavbarBlue() ? pinWhite : pinBlack}
          alt="pin"
        />
      </button>
    </nav>
  );
};

export default Navbar;
