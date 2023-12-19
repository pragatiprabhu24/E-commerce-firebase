import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Order from "./pages/Order"
import Dashboard from "./pages/admin/Dashboard"
import NoPage from "./pages/NoPage"
import AppState from "./context/AppState"
import ProductInfo from "./pages/ProductInfo"
import Checkout from "./pages/Checkout"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import LoginModal from "./components/auth/LoginModal"
import RegisterModal from "./components/auth/RegisterModal"

function App() {
  const { isOpen } = useSelector((store) => store.modal)
  const { isLoginOpen } = useSelector((store) => store.modal)

  return (
    <AppState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
        {isLoginOpen && <LoginModal/>}
        {isOpen && <RegisterModal/>}
      </BrowserRouter>
      
    </AppState>
  )
}

export default App
