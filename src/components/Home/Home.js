
import 'components/Home/Home.scss'
import smiles from "assets/smilies.svg";
import Navbar from 'components/Navbar/Navbar'
import MapSection from 'components/MapSection/MapSection'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <Navbar className="white" />

        <img src={smiles} className="home__img" alt="smiles" />
        <h1 className="home__title">Welcome to <strong className="home--bold">target</strong></h1>
        <h2 className="home__subtitle">Find people near you & Connect</h2>

        <ul className="home__instructions-text">
          <li>Create a  target  by clicking wherever on the map, specify  the ratio and and a topic: Travel, Dating, Music, etc. </li>
          <li><strong className="home--bold">target</strong> will  start a chat whenever you&lsquo;ve a match. You can always dismiss a conversation if you&lsquo;re not interested.</li>
        </ul>

        <Link to="/home" className="home__button btn">ok; got it!</Link>
      </div>

      <MapSection />
    </div>
  )
}

export default Home;
