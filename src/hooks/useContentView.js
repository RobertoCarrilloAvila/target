import { useContext } from 'react';
import { ContentViewContext } from 'contexts/ContentViewContext';

const useContentView = () => {
  const {
    displayedComponent,
    setDisplayedComponent,
    displayMap,
    setDisplayMap,
    navbarColor,
    setNavbarColor,
    navbarLeftButton,
    setNavbarLeftButton,
  } = useContext(ContentViewContext);

  return {
    displayedComponent,
    setDisplayedComponent,
    displayMap,
    setDisplayMap,
    navbarColor,
    setNavbarColor,
    navbarLeftButton,
    setNavbarLeftButton,
  };
};

export default useContentView;
