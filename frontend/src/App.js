import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import User from "./pages/User";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Groupproduct from "./pages/Groupproduct"
import Shop from "./pages/Shop";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/groupproduct" element={<Groupproduct />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}