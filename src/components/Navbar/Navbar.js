import { useState } from 'react';
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

const Navbar = ({ className, rightButton, leftButton }) => {
  const { setDisplayedComponent, displayMap, setDisplayMap } = useContentView();
  const [showmenu, setShowMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isLoggedIn] = useState(UserService.isLoggedIn());
  const navigate = useNavigate();
  const blueNavbar = className.includes('blue');

  const toggleMenu = () => {
    setShowMenu(!showmenu);
  };

  const toggleContactModal = () => {
    setShowMenu(false);
    setShowContactModal(!showContactModal);
  };

  const toogleMap = () => {
    setDisplayMap(!displayMap);
  };

  const handleLogout = async () => {
    if (await UserService.logOut()) {
      navigate(PublicPaths.ROOT);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  const renderLeftButton = () => {
    if (leftButton == 'back') {
      return (
        <button onClick={() => setDisplayedComponent(Components.CHAT)}>
          <img
            className="navbar__item"
            src={backArrow}
            alt="back arrow"
          />
        </button>
      );
    } else if (leftButton == 'empty') {
      return <button></button>;
    } else {
      return (
        <button onClick={toggleMenu} data-target="navbar__collapsible-menu">
          <img
            className="navbar__item"
            src={blueNavbar ? menuWhite : menuBlack}
            alt="hamburger menu"
          />
        </button>
      );
    }
  };

  return (
    <nav className={`navbar navbar--${className}`}>
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

      {rightButton || (
        <button onClick={toogleMap}>
          <img
            className="navbar__item navbar__pin"
            src={blueNavbar ? pinWhite : pinBlack}
            alt="pin"
          />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
