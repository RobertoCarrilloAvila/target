import { createContext, useState } from 'react';

import Components from 'components/Constants/Components';

const ContentViewContext = createContext();

const ContentViewContextProvider = ({ children }) => {
  const [displayedComponent, setDisplayedComponent] = useState(
    Components.WELCOME
  );
  const [displayMap, setDisplayMap] = useState(false);
  const [navbarColor, setNavbarColor] = useState('white');
  const [navbarLeftButton, setNavbarLeftButton] = useState('');

  const contentViewFunctions = {
    displayedComponent,
    setDisplayedComponent,
    displayMap,
    setDisplayMap,
    navbarColor,
    setNavbarColor,
    navbarLeftButton,
    setNavbarLeftButton,
  };

  return (
    <ContentViewContext.Provider value={contentViewFunctions}>
      {children}
    </ContentViewContext.Provider>
  );
};

export {ContentViewContext, ContentViewContextProvider};
