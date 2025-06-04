import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

import Home from './Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footerr';
import Sales from './components/Sales';
import Services from './components/Services';
import Accessories from './components/Accessories';
import Privacy from './components/Privacy';
import Tos from './components/Tos';
import Buynow from './components/Buynow';
import Details from './components/Details';
import NotFound from './components/NotFound';
import RedirectHandler from "./utils/RedirectHandler";
import RedirectionS from './components/RedirectionS';
import Cart from './components/Cart';
import Pay from './components/Pay';
import AuthPages from './components/AuthPages';
import AllPro from './components/AllPro';
import Profile from './components/Profile';
import Verify from "./pages/Verify";
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import RPayment from './components/RPayment';
import AllUsers from './admin/AllUsers';
import AllOrders from './admin/AllOrders';
import GlobalLoader from './pages/Loader';
import ForgetPassword from './pages/ForgetPassword';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('userId') !== null;
  return isLoggedIn ? children : <Navigate to="/auth" />;
};

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin == 'true';
  return isAdmin ? children : <Navigate to="/" />;
};

const AppContent = ({ isLoggedIn }) => {
  const location = useLocation();
  const [hostPath, setHostPath] = useState(location.pathname);

  useEffect(() => {
    setHostPath(location.pathname);
  }, [location]);

  return (
    <>
      <RedirectHandler />
      <Analytics />
      {isLoggedIn && hostPath !== "/pay" && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <AuthPages />} />
        <Route path="/auth" element={<AuthPages />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/services" element={<Services />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/det" element={<Details />} />
        <Route path="/:name/details/:id" element={<Details />} />
        <Route path="/products" element={<AllPro />} />

        <Route path="/settings" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/reset" element={<ProtectedRoute><ForgetPassword /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/buy" element={<ProtectedRoute><Buynow /></ProtectedRoute>} />
        <Route path="/pay" element={<ProtectedRoute><Pay /></ProtectedRoute>} />
        <Route path="/rpay" element={<ProtectedRoute><RPayment /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/add" element={<AdminRoute><AddProduct /></AdminRoute>} />
        <Route path="/:cname/edit/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
        <Route path="/users" element={<AdminRoute><AllUsers /></AdminRoute>} />
        <Route path="/orders" element={<AdminRoute><AllOrders /></AdminRoute>} />

        <Route path="/loader" element={<GlobalLoader />} />
        <Route path="/301" element={<RedirectionS />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isLoggedIn && <Footer />}
      <ToastContainer />
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('userId') !== null;
    setIsLoggedIn(status);
  }, []);

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} />
    </Router>
  );
};

export default App;
