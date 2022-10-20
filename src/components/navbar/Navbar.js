import "./Navbar.scss"

const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="navbar-item navbar-icon-left" src="/assets/icons/menu.svg" alt="hamburger menu" />
      <h1 className="navbar-item navbar-title">TARGET</h1>
      <img className="navbar-item navbar-icon-right" src="/assets/icons/pin.svg" alt="pin" />
    </nav>
  )
}

export default Navbar
