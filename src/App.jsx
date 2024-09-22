import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Allbooks from "views/allbooks";
import Checkout from "views/checkout";
import Home from "views/landing/home";
import AddBook from "views/addbooks";
import About from "views/about"
import Contact from "views/contact";
import Payment from "views/payment"
import Contact from "views/contact"


const App = () => {
  return (
    <Routes>
      <Route path="home/*" element={<Home />} />
      <Route path="allbooks" element={<Allbooks />} />
      <Route path="addbooks" element={<AddBook />} />
      <Route path="checkout" element={<Checkout />} />

      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />


      <Route path="payment" element={<Payment />} />
      <Route path="contact" element={<Contact />} />
      


      <Route path="auth/*" element={<AuthLayout />} />
 
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default App;
