import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashboard";
import Product from "./pages/Admin/Product";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/product" element={<Product />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
