import React, { useState } from 'react';

import 'components/Home/Home.scss'
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';

const Home = () => {
  const [displayedComponent, setDisplayedComponent] = useState('Welcome');

  const welcomeComponent = () => {
    return <Welcome setDisplayedComponent={setDisplayedComponent} />;
  }

  const components = {
    Welcome: welcomeComponent
  }

  return (
    <div className="home">
      <div className="home__container">
        <Navbar className="white" />

        { components[displayedComponent]() }
      </div>

      <MapSection />
    </div>
  )
}

export default Home;
