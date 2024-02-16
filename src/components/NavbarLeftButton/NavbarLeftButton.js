import useContentView from 'hooks/useContentView';
import Components from 'components/Constants/Components';

import menuBlack from 'assets/icons/menu_black.svg';
import menuWhite from 'assets/icons/menu_white.svg';
import backArrow from 'assets/icons/back_arrow.svg';

const NavbarLeftButton = ({ action, isNavbarBlue, backgroundColors, setNavbarBackgroundColor, toggleMenu }) => {
  const { goTo, isMapVisible, setIsMapVisible } = useContentView();

  const handleBackButton = () => {
    if (isMapVisible) {
      setIsMapVisible(false);
    } else {
      goTo(Components.CHAT);
      setNavbarBackgroundColor(backgroundColors.WHITE);
    }
  };

  if (action === "back") {
    return (
      <button className="navbar__back" onClick={handleBackButton}>
        <img className="navbar__item" src={backArrow} alt="back arrow" />
      </button>
    );
  }

  if (action == 'empty') {
    return <button></button>; 
  }

  return (
    <button onClick={toggleMenu} data-target="navbar__collapsible-menu">
      <img
        className="navbar__item"
        src={isNavbarBlue() ? menuWhite : menuBlack}
        alt="hamburger menu"
      />
    </button>
  );
};

export default NavbarLeftButton;
