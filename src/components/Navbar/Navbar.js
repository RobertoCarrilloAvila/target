import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import 'components/Navbar/Navbar.scss';
import menuBlack from 'assets/icons/menu_black.svg';
import menuWhite from 'assets/icons/menu_white.svg';
import pinBlack from 'assets/icons/pin_black.svg';
import pinWhite from 'assets/icons/pin_white.svg';
import ContactModal from 'components/ContactModal/ContactModal';
import PublicPaths from 'components/Constants/PublicPaths';

import UserService from 'services/UserService';

const Navbar = ({ className, rightButton, leftButton }) => {
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

  const handleLogout = async () => {
    if (await UserService.logOut()) {
      navigate(PublicPaths.ROOT);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  const renderRightButton = () => {
    if (rightButton) return rightButton;

    return (
      <button>
        <img
          className="navbar__item navbar__pin"
          src={blueNavbar ? pinWhite : pinBlack}
          alt="pin"
        />
      </button>
    );
  };

  const renderleftButton = () => {
    if (leftButton) return leftButton;

    return (
      <button onClick={toggleMenu} data-target="navbar__collapsible-menu">
        <img
          className="navbar__item"
          src={blueNavbar ? menuWhite : menuBlack}
          alt="hamburger menu"
        />
      </button>
    );
  };

  return (
    <nav className={`navbar navbar--${className}`}>
      {renderleftButton()}

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

      {renderRightButton()}
    </nav>
  );
};

export default Navbar;
