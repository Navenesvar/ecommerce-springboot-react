import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminDashboard from "./pages/Admindashboard";
import AdminEditProduct from "./pages/AdminEditProduct";
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Products />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
        path="/admin/add-product"
        element={<AdminAddProduct />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/edit-product/:id"
          element={<AdminEditProduct />}
        />
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;