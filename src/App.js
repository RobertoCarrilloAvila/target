import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentViewContextProvider } from 'contexts/ContentViewContext';

import publicRoutes from 'routers/public_routes';
import privateRoutes from 'routers/private_routes';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

import 'App.scss';

function App() {
  return (
    <BrowserRouter>
      <ContentViewContextProvider>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<PrivateRoute>{route.element}</PrivateRoute>}
            />
          ))}
        </Routes>
      </ContentViewContextProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
