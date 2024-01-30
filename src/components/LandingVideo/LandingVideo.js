import 'components/LandingVideo/LandingVideo.scss';

import appstore from 'assets/appstore.png';
import iphone6 from 'assets/iphone6.png';
import facebook from 'assets/icons/facebook.svg';
import twitter from 'assets/icons/twitter.svg';

const LandingVideo = () => (
  <div className="landing-video">
    <img className="landing-video__preview" src={iphone6} alt="iPhone6" />

    <a
      href="https://www.apple.com/app-store/"
      className="landing-video__appstore"
    >
      <img src={appstore} alt="App Store" />
    </a>

    <ul className="landing-video__social">
      <li className="landing-video__social-item">
        <a href="https://www.facebook.com/">
          <img src={facebook} alt="Facebook" />
        </a>
      </li>

      <li className="landing-video__social-item">
        <a href="https://twitter.com/">
          <img src={twitter} alt="Twitter" />
        </a>
      </li>
    </ul>
  </div>
);

export default LandingVideo;
