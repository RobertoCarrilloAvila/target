import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'i18n';
import { ContentViewContextProvider } from 'contexts/ContentViewContext';

import 'App.scss';

import routes from 'config/routes';

function App() {
  return (
    <BrowserRouter>
      <ContentViewContextProvider>
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </ContentViewContextProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
