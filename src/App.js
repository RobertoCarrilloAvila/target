import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n";

import Login from "./components/Login/Login";
import SignUp from "components/SignUp/SignUp";
import About from "components/About/About";

import "./App.scss";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
