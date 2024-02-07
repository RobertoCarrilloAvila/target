import React, { useState } from 'react';
import MapContext from 'contexts/MapContext';

import 'components/Home/Home.scss';
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';
import Chat from 'components/Chat/Chat';
import CreateTarget from 'components/CreateTarget/CreateTarget';
import Components from 'components/Constants/Components';

const Home = () => {
  const [displayedComponent, setDisplayedComponent] = useState(Components.WELCOME);
  const [mapProperties, setMapProperties] = useState({});
  const [targets, setTargets] = useState([]);

  const Component = {
    Welcome,
    Chat,
    CreateTarget,
  }[displayedComponent];

  return (
    <MapContext.Provider
      value={{ mapProperties, setMapProperties, targets, setTargets }}
    >
      <div className="home">
        <div className="home__container">
          <Navbar className="white" />

          <Component onContinue={setDisplayedComponent} />
        </div>

        <MapSection onSelectLocation={setDisplayedComponent} />
      </div>
    </MapContext.Provider>
  );
};

export default Home;
