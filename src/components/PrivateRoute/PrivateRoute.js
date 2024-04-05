import { Navigate } from 'react-router-dom';
import { usersService } from 'services';

import publicPaths from 'constants/publicPaths';

const PrivateRoute = ({ children }) =>
  usersService.isLoggedIn() ? children : <Navigate to={publicPaths.ROOT} />;

export default PrivateRoute;
