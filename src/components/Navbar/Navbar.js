import { Link } from "react-router-dom";
import { useState } from "react";

import "./Navbar.scss";
import menuBlack from "../../assets/icons/menu_black.svg";
import menuWhite from "../../assets/icons/menu_white.svg";
import pinBlack from "../../assets/icons/pin_black.svg";
import pinWhite from "../../assets/icons/pin_white.svg";
import ContactModal from "components/ContactModal/ContactModal";

const Navbar = ({ className }) => {
  const [showmenu, setShowMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const blueNavbar = className.includes("blue");

  const toggleMenu = () => {
    setShowMenu(!showmenu);
  };

  const toggleContactModal = () => {
    setShowMenu(false);
    setShowContactModal(!showContactModal);
  };

  return (
    <nav className={`navbar navbar--${className}`}>
      <button onClick={toggleMenu} data-target="navbar__collapsible-menu">
        <img
          className="navbar__item"
          src={blueNavbar ? menuWhite : menuBlack}
          alt="hamburger menu"
        />
      </button>

      {
        showmenu && (
          <div className="navbar__collapsible-menu">
            <ul className="navbar__menu">
              <li className="navbar__menu-item">
                <Link to="/about" className="navbar__link">about</Link>
              </li>
              <li className="navbar__menu-item">
                <button onClick={toggleContactModal} className="navbar__link">contact</button>
              </li>
            </ul>
          </div>
        )
      }

      {
        showContactModal && (
          <ContactModal toggleModal={toggleContactModal} />
        )
      }

      <h1 className="navbar__item navbar__title">TARGET</h1>

      <button>
        <img
          className="navbar__item"
          src={blueNavbar ? pinWhite : pinBlack}
          alt="pin"
        />
      </button>
    </nav>
  );
};

export default Navbar;
