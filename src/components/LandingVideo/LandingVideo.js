import "./LandingVideo.scss";

import appstore from "../../assets/appstore.png";
import iphone6 from "../../assets/iphone6.png";
import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";

const LandingVideo = () => {
  return (
    <div className="landing-video">
      <img id="preview" src={iphone6} alt="iPhone6" />

      <a href="https://www.apple.com/app-store/" className="appstore">
        <img src={appstore} alt="App Store" />
      </a>

      <ul className="social">
        <li className="social-item">
          <a href="https://www.facebook.com/">
            <img src={facebook} alt="Facebook" />
          </a>
        </li>

        <li className="social-item">
          <a href="https://twitter.com/">
            <img src={twitter} alt="Twitter" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LandingVideo;
