import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentViewContextProvider } from 'contexts/ContentViewContext';

import routes from 'config/routes';

import 'App.scss';

function App() {
  return (
    <BrowserRouter>
      <ContentViewContextProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </ContentViewContextProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
