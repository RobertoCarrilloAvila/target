import { useState } from 'react';
import { MapContextProvider } from 'contexts/MapContext';
import ContentViewContext from 'contexts/ContentViewContext';

import 'components/Home/Home.scss';
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';
import Chat from 'components/Chat/Chat';
import CreateTarget from 'components/CreateTarget/CreateTarget';
import EditProfile from 'components/EditProfile/EditProfile';
import DeleteTarget from 'components/DeleteTarget/DeleteTarget';
import Components from 'components/Constants/Components';

const Home = () => {
  const [displayedComponent, setDisplayedComponent] = useState(
    Components.WELCOME
  );

  const Component = {
    Welcome,
    Chat,
    CreateTarget,
    DeleteTarget,
    EditProfile,
  }[displayedComponent];

  return (
    <MapContextProvider>
      <ContentViewContext.Provider
        value={{ displayedComponent, setDisplayedComponent }}
      >
        <div className="home">
          <div className="home__container">
            <Navbar className="white" />

            <Component />
          </div>

          <MapSection />
        </div>
      </ContentViewContext.Provider>
    </MapContextProvider>
  );
};

export default Home;
