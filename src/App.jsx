import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Order from "./pages/Order"
import Cart from "./pages/Cart"
import Dashboard from "./pages/admin/Dashboard"
import NoPage from "./pages/NoPage"
import AppState from "./context/AppState"

function App() {
  return (
    <AppState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>

    </AppState>
  )
}

export default App
