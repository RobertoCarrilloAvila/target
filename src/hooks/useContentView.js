import { useContext } from 'react';
import { ContentViewContext } from 'contexts/ContentViewContext';

const useContentView = () => {
  return useContext(ContentViewContext);;
};

export default useContentView;
