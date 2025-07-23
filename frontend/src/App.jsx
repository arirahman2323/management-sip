import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashboard";
import ProductIndex from "./pages/Admin/Product/Index";
import ProductIn from "./pages/Admin/ProductIn/Index";
import ProductOut from "./pages/Admin/ProductOut/Index";
import Report from "./pages/Admin/Report/Index";
import ProductWillExpired from "./pages/Admin/ProductWillExpired/Index";
import ProductExpired from "./pages/Admin/ProductExpired/Index";
import ProductOrder from "./pages/Admin/ProductOrder/Index";
import ProductArrived from "./pages/Admin/ProductArrived/Index";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/product" element={<ProductIndex />}></Route>
          <Route path="/product-in" element={<ProductIn />}></Route>
          <Route path="/product-out" element={<ProductOut />}></Route>
          <Route path="/report" element={<Report />}></Route>
          <Route
            path="/product-will-expired"
            element={<ProductWillExpired />}
          ></Route>
          <Route path="/product-expired" element={<ProductExpired />}></Route>
          <Route path="/product-order" element={<ProductOrder />}></Route>
          <Route path="/product-arrived" element={<ProductArrived />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
