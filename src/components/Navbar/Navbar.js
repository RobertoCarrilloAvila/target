import { Link } from "react-router-dom";
import "./Navbar.scss";
import menuBlack from "../../assets/icons/menu_black.svg";
import menuWhite from "../../assets/icons/menu_white.svg";
import pinBlack from "../../assets/icons/pin_black.svg";
import pinWhite from "../../assets/icons/pin_white.svg";
import { useState } from "react";
import Modal from "components/Modal/Modal";

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
    <nav className={`navbar ${className}`}>
      <button onClick={toggleMenu} data-target="navbar-collapsible-menu">
        <img
          className="navbar-item navbar-icon-left"
          src={blueNavbar ? menuWhite : menuBlack}
          alt="hamburger menu"
        />
      </button>

      {
        showmenu ? (
          <div id="navbar-collapsible-menu">
            <ul className="navbar-menu">
              <li className="navbar-menu-item">
                <Link to="/about" className="navbar-link">about</Link>
              </li>
              <li className="navbar-menu-item">
                <button onClick={toggleContactModal} className="navbar-link">contact</button>
              </li>
            </ul>
          </div>
        ) : null
      }

      {
        showContactModal ? (
          <Modal toggleModal={toggleContactModal}>
            
          </Modal>
        ) : null
      }

      <h1 className="navbar-item navbar-title">TARGET</h1>

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
