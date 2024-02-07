import React, { useState } from 'react';
import { MapContextProvider } from 'contexts/MapContext';

import 'components/Home/Home.scss';
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';
import Chat from 'components/Chat/Chat';
import CreateTarget from 'components/CreateTarget/CreateTarget';

const Home = () => {
  const [displayedComponent, setDisplayedComponent] = useState('Welcome');

  const Component = {
    Welcome,
    Chat,
    CreateTarget,
  }[displayedComponent];

  return (
    <MapContextProvider>
      <div className="home">
        <div className="home__container">
          <Navbar className="white" />

          <Component onContinue={setDisplayedComponent} />
        </div>

        <MapSection onSelectLocation={setDisplayedComponent} />
      </div>
    </MapContextProvider>
  );
};

export default Home;
