import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useContentView from 'hooks/useContentView';

import 'components/Navbar/Navbar.scss';
import menuBlack from 'assets/icons/menu_black.svg';
import menuWhite from 'assets/icons/menu_white.svg';
import pinBlack from 'assets/icons/pin_black.svg';
import pinWhite from 'assets/icons/pin_white.svg';
import backArrow from 'assets/icons/back_arrow.svg';
import ContactModal from 'components/ContactModal/ContactModal';
import PublicPaths from 'components/Constants/PublicPaths';
import Components from 'components/Constants/Components';

import UserService from 'services/UserService';

const backgroundColors = {
  BLUE: 'blue',
  WHITE: 'white',
};

const Navbar = ({ color, leftButton }) => {
  const { setDisplayedComponent, isMapVisible, setIsMapVisible } = useContentView();
  const [showmenu, setShowMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isLoggedIn] = useState(UserService.isLoggedIn());
  const [leftAction, setLeftAction] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(color);
  const navigate = useNavigate();

  useEffect(() => {
    const assignBackgroundColor = () => {
      if (color == backgroundColors.BLUE || leftButton == 'back') {
        return backgroundColors.BLUE;
      } else {
        return backgroundColors.WHITE;
      }
    };

    setBackgroundColor(assignBackgroundColor());
    setLeftAction(leftButton);
  }, [color, leftButton]);

  const toggleMenu = () => {
    setShowMenu(!showmenu);
  };

  const toggleContactModal = () => {
    setShowMenu(false);
    setShowContactModal(!showContactModal);
  };

  const showMap = () => {
    setIsMapVisible(true);
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

  const handleBackButton = () => {
    if (isMapVisible) {
      setIsMapVisible(false);
    } else {
      setDisplayedComponent(Components.CHAT);
      setBackgroundColor(backgroundColors.WHITE);
    }
  };

  const isNavbarBlue = () => {
    return backgroundColor == backgroundColors.BLUE;
  };

  const renderLeftButton = () => {
    if (leftAction == 'back') {
      return (
        <button onClick={handleBackButton}>
          <img className="navbar__item" src={backArrow} alt="back arrow" />
        </button>
      );
    } else if (leftAction == 'empty') {
      return <button></button>;
    } else {
      return (
        <button onClick={toggleMenu} data-target="navbar__collapsible-menu">
          <img
            className="navbar__item"
            src={isNavbarBlue() ? menuWhite : menuBlack}
            alt="hamburger menu"
          />
        </button>
      );
    }
  };

  return (
    <nav className={`navbar navbar--${backgroundColor}`}>
      {renderLeftButton()}

      {showmenu && (
        <div className="navbar__collapsible-menu">
          <ul className="navbar__menu">
            <li className="navbar__menu-item">
              <Link to="/about" className="navbar__link">
                about
              </Link>
            </li>
            <li className="navbar__menu-item">
              <button onClick={toggleContactModal} className="navbar__link">
                contact
              </button>
            </li>
            <li className="navbar__menu-item">
              {isLoggedIn && (
                <button className="navbar__link" onClick={handleLogout}>
                  logout
                </button>
              )}
            </li>
          </ul>
        </div>
      )}

      {showContactModal && <ContactModal toggleModal={toggleContactModal} />}

      <h1 className="navbar__item navbar__title">TARGET</h1>
      <button onClick={showMap}>
        <img
          className={`navbar__item navbar__pin ${!isMapVisible ? '' : 'd-none'}`}
          src={isNavbarBlue() ? pinWhite : pinBlack}
          alt="pin"
        />
      </button>
    </nav>
  );
};

export default Navbar;
