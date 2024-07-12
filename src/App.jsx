import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Allbooks from "views/allbooks";
import Addbooks from "views/addbooks";
const App = () => {
  return (
    <Routes>
      <Route path="addbooks" element={<Addbooks />} />
      <Route path="allbooks" element={<Allbooks />} />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
