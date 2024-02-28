import Login from 'components/Login/Login';
import SignUp from 'components/SignUp/SignUp';
import About from 'components/About/About';

import PublicPaths from 'components/Constants/PublicPaths';

const publicRoutes = [
  { path: PublicPaths.ROOT, element: <Login /> },
  { path: PublicPaths.ABOUT, element: <About /> },
  { path: PublicPaths.SIGN_UP, element: <SignUp /> },
];

export default publicRoutes;
