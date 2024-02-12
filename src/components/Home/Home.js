import { useState } from 'react';
import { MapContextProvider } from 'contexts/MapContext';
import ContentViewContext from 'contexts/ContentViewContext';
import Components from 'components/Constants/Components';

import 'components/Home/Home.scss';
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';
import Chat from 'components/Chat/Chat';
import CreateTarget from 'components/CreateTarget/CreateTarget';
import EditProfile from 'components/EditProfile/EditProfile';

const Home = () => {
  const [displayMap, setDisplayMap] = useState(false);
  const [navbarColor, setNavbarColor] = useState('white');
  const [navbarLeftButton, setNavbarLeftButton] = useState('');
  const [displayedComponent, setDisplayedComponent] = useState(
    Components.WELCOME
  );

  const Component = {
    Welcome,
    Chat,
    CreateTarget,
    EditProfile,
  }[displayedComponent];

  const contentViewFunctions = {
    displayedComponent,
    setDisplayedComponent,
    displayMap,
    setDisplayMap,
    setNavbarColor,
    setNavbarLeftButton,
  };

  return (
    <MapContextProvider>
      <ContentViewContext.Provider
        value={contentViewFunctions}
      >
        <div className="home">
          <div className={`home__container ${displayMap ? 'hide' : ''}`}>
            <Navbar className={navbarColor} leftButton={navbarLeftButton} />

            <div className="home__content">
              <Component />
            </div>
          </div>

          <MapSection className={displayMap ? 'open' : ''} />
        </div>
      </ContentViewContext.Provider>
    </MapContextProvider>
  );
};

export default Home;
