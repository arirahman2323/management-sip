import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashboard";
import ProductIndex from "./pages/Admin/Product/Index";
import ProductIn from "./pages/Admin/ProductIn/Index";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/product" element={<ProductIndex />}></Route>
          <Route path="/product-in" element={<ProductIn />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
