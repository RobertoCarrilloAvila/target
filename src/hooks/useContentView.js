import { useContext, useEffect } from 'react';
import { ContentViewContext } from 'contexts/ContentViewContext';

import Components from 'components/Constants/Components';

const useContentView = () => {
  const contentViewContext = useContext(ContentViewContext);
  const { setNavbarColor, setNavbarLeftButton, displayedComponent } =
    contentViewContext;

  useEffect(() => {
    if (displayedComponent === Components.CHAT) {
      setNavbarColor('white');
      setNavbarLeftButton('');
    }
  }, [displayedComponent, setNavbarColor, setNavbarLeftButton]);

  return contentViewContext;
};

export default useContentView;
