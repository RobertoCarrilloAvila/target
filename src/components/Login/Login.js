import './Login.scss'

import Navbar from "../Navbar/Navbar"
import FormInput from '../FormInput/FormInput'

const Login = () => {
  return (
    <div className="login">
      <Navbar className="white" />

      <section className="container">
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
      </section>

      <section className="preview">
        <button className="btn">Create a Target</button>
      </section>
    </div>
  )
}

export default Login;
