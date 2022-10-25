import "./Navbar.scss"

const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="navbar-item navbar-icon-left" src="/assets/icons/menu_white.svg" alt="hamburger menu" />
      <h1 className="navbar-item navbar-title">TARGET</h1>
      <img className="navbar-item navbar-icon-right" src="/assets/icons/pin_white.svg" alt="pin" />
    </nav>
  )
}

export default Navbar;
