import { Navigate } from 'react-router-dom';
import { isLoggedIn } from 'services/userService';

import publicPaths from 'constants/publicPaths';

const PrivateRoute = ({ children }) =>
  isLoggedIn() ? children : <Navigate to={publicPaths.ROOT} />;

export default PrivateRoute;
