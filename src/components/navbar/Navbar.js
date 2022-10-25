import "./Navbar.scss"

const Navbar = ({ className }) => {
  const image_color = className.includes("blue") ? "white" : "black"

  return (
    <nav className={`navbar ${className}`}>
      <img
        className="navbar-item navbar-icon-left"
        src={`/assets/icons/menu_${image_color}.svg`}
        alt="hamburger menu"
      />

      <h1 className="navbar-item navbar-title">TARGET</h1>
      
      <img
        className="navbar-item navbar-icon-right"
        src={`/assets/icons/pin_${image_color}.svg`}
        alt="pin"
      />
    </nav>
  )
}

export default Navbar;
