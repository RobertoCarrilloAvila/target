import "./LandingVideo.scss";

const LandingVideo = () => {
  return (
    <div className="landing-video">
      <img id="preview" src="/assets/iphone6.png" alt="iPhone6" />

      <a href="https://www.apple.com/app-store/" className="appstore">
        <img src="/assets/appstore.png" alt="App Store" />
      </a>

      <ul className="social">
        <li className="social-item">
          <a href="https://www.facebook.com/">
            <img src="/assets/icons/facebook.svg" alt="Facebook" />
          </a>
        </li>

        <li className="social-item">
          <a href="https://twitter.com/">
            <img src="/assets/icons/twitter.svg" alt="Twitter" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LandingVideo;
