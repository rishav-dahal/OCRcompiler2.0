import "./App.css";
import Landingpage from "./pages/Landingpage";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landingpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
