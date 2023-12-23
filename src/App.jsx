import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Dashboard from "./pages/admin/Dashboard";
import NoPage from "./pages/NoPage";
import AppState from "./context/AppState";
import ProductInfo from "./pages/ProductInfo";
import Checkout from "./pages/Checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./components/auth/LoginModal";
import RegisterModal from "./components/auth/RegisterModal";
import { openLoginModal } from "./redux/slice/ModalSlice";
import AddProduct from "./pages/admin/AddProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import AllProducts from "./pages/AllProducts";
import ScrollToTop from "./components/app/ScrollToTop";
import ContactForm from "./pages/ContactForm";

export const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  if (localStorage.getItem("user")) {
    return children;
  } else {
    dispatch(openLoginModal());
  }
};

export const ProtectedRoutesForAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("user"));
  console.log(admin.user.email);
  if (admin.user.email === "knupadhyay784@gmail.com") {
    return children;
  } else {
    dispatch(openLoginModal());
  }
};

function App() {
  const { isOpen } = useSelector((store) => store.modal);
  const { isLoginOpen } = useSelector((store) => store.modal);

  return (
    <AppState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/order"
            element={
              <ProtectedRoutes>
                <Order />
              </ProtectedRoutes>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="/*" element={<NoPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product" element={<UpdateProduct />} />
        </Routes>
        <ScrollToTop />
        <ToastContainer />
        {isLoginOpen && <LoginModal />}
        {isOpen && <RegisterModal />}
      </BrowserRouter>
    </AppState>
  );
}

export default App;
