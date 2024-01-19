import { Link } from 'react-router-dom';

import smiles from "assets/smilies.svg";
import 'components/Welcome/Welcome.scss';


const Welcome = ({ setDisplayedComponent }) => {
  return (
    <div className="welcome">
      <img src={smiles} className="welcome__img" alt="smiles" />
      <h1 className="welcome__title">Welcome to <strong className="welcome--bold">target</strong></h1>
      <h2 className="welcome__subtitle">Find people near you & Connect</h2>

      <ul className="welcome__instructions-text">
        <li>Create a  target  by clicking wherever on the map, specify  the ratio and and a topic: Travel, Dating, Music, etc. </li>
        <li><strong className="welcome--bold">target</strong> will  start a chat whenever you&lsquo;ve a match. You can always dismiss a conversation if you&lsquo;re not interested.</li>
      </ul>

      <button
        className="welcome__button btn"
        onClick={ () => setDisplayedComponent('Chat') }>
          ok; got it!
      </button>
    </div>
  )
}

export default Welcome;
