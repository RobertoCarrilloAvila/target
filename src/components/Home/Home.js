import { MapContextProvider } from 'contexts/MapContext';
import useContentView from 'hooks/useContentView';

import 'components/Home/Home.scss';
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';
import Chat from 'components/Chat/Chat';
import CreateTarget from 'components/CreateTarget/CreateTarget';
import EditProfile from 'components/EditProfile/EditProfile';

const Home = () => {
  const {displayedComponent, displayMap, navbarColor, navbarLeftButton} = useContentView();

  const Component = {
    Welcome,
    Chat,
    CreateTarget,
    EditProfile,
  }[displayedComponent];

  return (
    <MapContextProvider>
      <div className="home">
        <div className={`home__container ${displayMap ? 'hide' : ''}`}>
          <Navbar color={navbarColor} leftButton={navbarLeftButton} />

          <div className="home__content">
            <Component />
          </div>
        </div>

        <MapSection className={displayMap ? 'open' : ''} />
      </div>
    </MapContextProvider>
  );
};

export default Home;
