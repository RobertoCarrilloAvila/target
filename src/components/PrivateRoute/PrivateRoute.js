import { Navigate } from 'react-router-dom';
import UserService from 'services/UserService';

import PublicPaths from 'components/Constants/PublicPaths';

const PrivateRoute = ({ children }) =>
  UserService.isLoggedIn() ? children : <Navigate to={PublicPaths.ROOT} />;

export default PrivateRoute;
