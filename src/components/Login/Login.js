import './Login.scss'

import Navbar from "../Navbar/Navbar"
import LandingVideo from '../LandingVideo/LandingVideo'
import FormInput from '../FormInput/FormInput'

const Login = () => {
  return (
    <div className="login">

      <section className="container">
        <Navbar className="white" />

        <div className="login-header-img">
          <img src="assets/smilies.svg" alt="smiles" />
          <h2>Target MVD</h2>
        </div>

        <p className="login-header-text">
          <span>Find people near you & Connect</span>
          Create a  target  wherever on the map, specify your interest: Travel, Dating,
          Music, etc and start conecting with others who share your interest.
        </p>

        <form className="login-form">
          <FormInput type="text" id="email" name="email" label="Email" />
          <FormInput type="password" id="password" name="password" label="Password" />

          <button type="submit" id="login-submit" className='btn'>Sign In</button>
        </form>

        <a className='forgot-password' href="#">Forgot your password?</a>

        <a id='facebook-signup' >
          connect with facebook
        </a>
        <a className='email-signup' href="#">Sign up</a>
      </section>

      <LandingVideo />
    </div>
  )
}

export default Login;
