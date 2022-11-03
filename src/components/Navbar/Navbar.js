import "./Navbar.scss";
import menuBlack from "../../assets/icons/menu_black.svg";
import menuWhite from "../../assets/icons/menu_white.svg";
import pinBlack from "../../assets/icons/pin_black.svg";
import pinWhite from "../../assets/icons/pin_white.svg";

const Navbar = ({ className }) => {
  const isWhite = className.includes("blue");

  return (
    <nav className={`navbar ${className}`}>
      <img
        className="navbar-item navbar-icon-left"
        src={isWhite ? menuWhite : menuBlack}
        alt="hamburger menu"
      />

      <h1 className="navbar-item navbar-title">TARGET</h1>

      <img
        className="navbar-item navbar-icon-right"
        src={isWhite ? pinWhite : pinBlack}
        alt="pin"
      />
    </nav>
  );
};

export default Navbar;
