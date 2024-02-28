import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import Home from "components/Home/Home";

import PrivatePaths from "components/Constants/PrivatePaths";

const privateRoutes = [
  { path: PrivatePaths.HOME, element: <PrivateRoute><Home /></PrivateRoute> },
];

export default privateRoutes;
