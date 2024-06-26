import { MapContextProvider } from 'contexts/MapContext';
import useContentView from 'hooks/useContentView';

import './Home.scss';
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';
import Chat from 'components/Chat/Chat';
import CreateTarget from 'components/CreateTarget/CreateTarget';
import EditProfile from 'components/EditProfile/EditProfile';
import DeleteTarget from 'components/DeleteTarget/DeleteTarget';
import Conversation from 'components/Conversation/Conversation';

import useNotifications from 'hooks/useNotifications';

const Home = () => {
  useNotifications();
  const { displayedComponent, isMapVisible, navbarColor, navbarLeftButton } =
    useContentView();

  const Component = {
    Welcome,
    Chat,
    CreateTarget,
    DeleteTarget,
    EditProfile,
    Conversation,
  }[displayedComponent];

  return (
    <MapContextProvider>
      <div className="home">
        <div className={`home__container ${isMapVisible ? 'hide' : ''}`}>
          <Navbar color={navbarColor} leftButton={navbarLeftButton} />

          <div className="home__content">
            <Component />
          </div>
        </div>

        <MapSection className={isMapVisible ? 'open' : ''} />
      </div>
    </MapContextProvider>
  );
};

export default Home;
