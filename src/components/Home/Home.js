import React, { useState } from 'react';
import MapContext from 'contexts/MapContext';

import 'components/Home/Home.scss';
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';
import Chat from 'components/Chat/Chat';

const Home = () => {
  const [displayedComponent, setDisplayedComponent] = useState('Welcome');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const Component = {
    Welcome,
    Chat,
  }[displayedComponent];

  return (
      <MapContext.Provider value={{ selectedLocation, setSelectedLocation }}>
    <div className="home">
        <div className="home__container">
          <Navbar className="white" />

          <Component onContinue={setDisplayedComponent} />
        </div>

        <MapSection />
    </div>
      </MapContext.Provider>
  );
};

export default Home;
