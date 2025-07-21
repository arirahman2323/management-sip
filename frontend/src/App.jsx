import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashboard";
import Index from "./pages/Admin/Product/Index";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Index" element={<Index />}></Route> //Product Index
        </Routes>
      </Router>
    </div>
  );
};

export default App;
