import { Navigate } from 'react-router-dom';
import UserService from 'services/userService';

import publicPaths from 'constants/publicPaths';

const PrivateRoute = ({ children }) =>
  UserService.isLoggedIn() ? children : <Navigate to={publicPaths.ROOT} />;

export default PrivateRoute;
