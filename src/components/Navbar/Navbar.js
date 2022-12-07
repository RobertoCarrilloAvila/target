import { useTranslation } from 'react-i18next';

import menuBlack from "../../assets/icons/menu_black.svg";
import menuWhite from "../../assets/icons/menu_white.svg";
import pinBlack from "../../assets/icons/pin_black.svg";
import pinWhite from "../../assets/icons/pin_white.svg";

import "./Navbar.scss";

const Navbar = ({ className }) => {
  const { t } = useTranslation();
  const blueNavbar = className.includes("blue");

  const toggleMenu = (event) => {
    const target_id = event.currentTarget.dataset.target;
    const menu = document.getElementById(target_id);
    menu.classList.toggle("show");
  };

  return (
    <nav className={`navbar ${className}`}>
      <button onClick={toggleMenu} data-target="navbar-collapsible-menu">
        <img
          className="navbar-item navbar-icon-left"
          src={blueNavbar ? menuWhite : menuBlack}
          alt="hamburger menu"
        />
      </button>

      <div id="navbar-collapsible-menu">
        <ul className="navbar-menu">
          <li className="navbar-menu-item">
            <a href="#about" className="navbar-link">{t("navbar.about")}</a>
          </li>
          <li className="navbar-menu-item">
            <a href="#contact" className="navbar-link">{t("navbar.contact")}</a>
          </li>
        </ul>
      </div>

      <h1 className="navbar-item navbar-title">{t("navbar.title")}</h1>

      <button>
        <img
          className="navbar-item navbar-icon-right"
          src={blueNavbar ? pinWhite : pinBlack}
          alt="pin"
        />
      </button>
    </nav>
  );
};

export default Navbar;
