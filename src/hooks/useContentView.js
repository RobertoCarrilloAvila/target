import { useContext, useEffect } from 'react';
import { ContentViewContext } from 'contexts/ContentViewContext';

import COMPONENT_NAMES from 'components/Constants/Components';

const useContentView = () => {
  const contentViewContext = useContext(ContentViewContext);
  const { setNavbarColor, setNavbarLeftButton, displayedComponent } =
    contentViewContext;

  useEffect(() => {
    if (displayedComponent === COMPONENT_NAMES.CHAT) {
      setNavbarColor('white');
      setNavbarLeftButton('');
    }
  }, [displayedComponent, setNavbarColor, setNavbarLeftButton]);

  return contentViewContext;
};

export default useContentView;
