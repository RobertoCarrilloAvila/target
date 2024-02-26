import { createContext, useState } from 'react';

import COMPONENT_NAMES from 'components/Constants/Components';

const ContentViewContext = createContext();

const ContentViewContextProvider = ({ children }) => {
  const [displayedComponent, goTo] = useState(COMPONENT_NAMES.WELCOME);
  const [displayedComponentData, setDisplayedComponentData] = useState({});
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [navbarColor, setNavbarColor] = useState('white');
  const [navbarLeftButton, setNavbarLeftButton] = useState('');

  const contentViewFunctions = {
    displayedComponent,
    goTo,
    displayedComponentData,
    setDisplayedComponentData,
    isMapVisible,
    setIsMapVisible,
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

export { ContentViewContext, ContentViewContextProvider };
