import React, { useState } from 'react';
import MapContext from 'contexts/MapContext';

import 'components/Home/Home.scss';
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';
import Chat from 'components/Chat/Chat';
import CreateTarget from 'components/CreateTarget/CreateTarget';

const Home = () => {
  const [displayedComponent, setDisplayedComponent] = useState('Welcome');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRadius, setSelectedRadius] = useState(1);
  const [targets, setTargets] = useState([]);

  const Component = {
    Welcome,
    Chat,
    CreateTarget,
  }[displayedComponent];

  return (
    <MapContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        selectedRadius,
        setSelectedRadius,
        targets,
        setTargets,
      }}
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
