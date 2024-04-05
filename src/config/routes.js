import Login from 'components/Login/Login';
import SignUp from 'components/SignUp/SignUp';
import About from 'components/About/About';
import Home from 'components/Home/Home';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

import publicPaths from 'constants/publicPaths';
import privatePaths from 'constants/privatePaths';

const routes = [
  { path: publicPaths.ROOT, element: <Login /> },
  { path: publicPaths.ABOUT, element: <About /> },
  { path: publicPaths.SIGN_UP, element: <SignUp /> },
  {
    path: privatePaths.HOME,
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
];

export default routes;
