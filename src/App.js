import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicPaths from "components/Constants/PublicPaths";
import PrivatePaths from "components/Constants/PrivatePaths";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

import "App.scss";
import Login from "components/Login/Login";
import SignUp from "components/SignUp/SignUp";
import About from "components/About/About";
import Home from "components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PublicPaths.ROOT} element={<Login />} />
        <Route path={PublicPaths.ABOUT} element={<About />} />
        <Route path={PublicPaths.SIGN_UP} element={<SignUp />} />

        <Route
          path={PrivatePaths.HOME}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
