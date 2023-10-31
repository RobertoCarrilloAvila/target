
import './Welcome.scss'
import smiles from "../../assets/smilies.svg";
import Navbar from 'components/Navbar/Navbar'
import MapSection from 'components/MapSection/MapSection'
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="container">
        <Navbar className="white" />

        <img src={smiles} className="welcome-img" alt="smiles" />
        <h1 id="welcome-title">Welcome to <strong>target</strong></h1>
        <h2 id="welcome-subtitle">Find people near you & Connect</h2>

        <ul className="welcome-instructions-text">
          <li>Create a  target  by clicking wherever on the map, specify  the ratio and and a topic: Travel, Dating, Music, etc. </li>
          <li><strong>target</strong> will  start a chat whenever you've a match. You can always dismiss a conversation if you're not interested.</li>
        </ul>

        <Link to="/home" className="welcome-button btn">ok; got it!</Link>
      </div>

      <MapSection />
    </div>
  )
}

export default Welcome;
