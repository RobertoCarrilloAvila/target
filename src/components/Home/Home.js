import React, { useState } from 'react';

import 'components/Home/Home.scss'
import Navbar from 'components/Navbar/Navbar';
import MapSection from 'components/MapSection/MapSection';
import Welcome from 'components/Welcome/Welcome';
import Chat from 'components/Chat/Chat';

const Home = () => {
  const [displayedComponent, setDisplayedComponent] = useState('Welcome');

  const Component = {
    Welcome,
    Chat
  }[displayedComponent];

  return (
    <div className="home">
      <div className="home__container">
        <Navbar className="white" />

        <Component setDisplayedComponent={setDisplayedComponent} />
      </div>

      <MapSection />
    </div>
  )
}

export default Home;
