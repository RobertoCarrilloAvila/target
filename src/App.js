import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentViewContextProvider } from 'contexts/ContentViewContext';
import { ActionCableContextProvider } from 'contexts/ActionCableContext';

import 'App.scss';

import routes from 'config/routes';

function App() {
  return (
    <BrowserRouter>
      <ContentViewContextProvider>
        <ActionCableContextProvider>
          <Routes>
            {routes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Routes>
        </ActionCableContextProvider>
      </ContentViewContextProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
