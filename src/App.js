import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login/Login";
import SignUp from "components/SignUp/SignUp";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
