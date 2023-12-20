
import './Welcome.scss'
import smiles from "../../assets/smilies.svg";
import Navbar from '../Navbar/Navbar'
import MapSection from '../MapSection/MapSection'
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome__container">
        <Navbar className="white" />

        <img src={smiles} className="welcome__img" alt="smiles" />
        <h1 className="welcome__title">Welcome to <strong className="welcome--bold">target</strong></h1>
        <h2 className="welcome__subtitle">Find people near you & Connect</h2>

        <ul className="welcome__instructions-text">
          <li>Create a  target  by clicking wherever on the map, specify  the ratio and and a topic: Travel, Dating, Music, etc. </li>
          <li><strong className="welcome--bold">target</strong> will  start a chat whenever you&lsquo;ve a match. You can always dismiss a conversation if you&lsquo;re not interested.</li>
        </ul>

        <Link to="/home" className="welcome__button btn">ok; got it!</Link>
      </div>

      <MapSection />
    </div>
  )
}

export default Welcome;
