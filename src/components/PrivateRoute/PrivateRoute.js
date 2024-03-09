import { Navigate } from 'react-router-dom';
import UserService from 'services/userService';

import PublicPaths from 'constants/PublicPaths';

const PrivateRoute = ({ children }) =>
  UserService.isLoggedIn() ? children : <Navigate to={PublicPaths.ROOT} />;

export default PrivateRoute;
