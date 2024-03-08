import Login from 'components/Login/Login';
import SignUp from 'components/SignUp/SignUp';
import About from 'components/About/About';
import Home from 'components/Home/Home';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

import PublicPaths from 'constants/PublicPaths';
import PrivatePaths from 'constants/PrivatePaths';

const routes = [
  { path: PublicPaths.ROOT, element: <Login /> },
  { path: PublicPaths.ABOUT, element: <About /> },
  { path: PublicPaths.SIGN_UP, element: <SignUp /> },
  {
    path: PrivatePaths.HOME,
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
];

export default routes;
