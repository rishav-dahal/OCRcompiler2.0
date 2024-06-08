import "./App.css";
import Landingpage from "./pages/Landingpage";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landingpage />}>
          
        </Route>
        <Route path="/login" element={ <Loginpage />}>
         
        </Route>
        <Route path="/home" element={<Homepage />}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
