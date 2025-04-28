import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";
import PrivateComponents from "./components/PrivateComponents";
import { ToastContainer } from "react-toastify";
import CreatePlan from "./pages/CreatePlan";
import ViewPlans from "./pages/ViewPlans";
import ViewPlan from "./pages/ViewPlan";
import AdminDashboard from "./components/AdminDashboard";
import { useSelector } from "react-redux";
import SareUsers from "./pages/admin/AllUsers";
import SarePlans from "./pages/admin/AllPlans";
import SingleUser from "./pages/admin/SingleUser";

const App = () => {

  const user = useSelector(state => state.Auth.user)
  const isAdmin = user?.admin === true

  return (
    <Router>
      {!isAdmin && <Navbar />}
      <div
        className="p-3 bg-gray-700 text-center">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<PrivateComponents />}>
            <Route path="" element={<Home />} />
            <Route path="create-plan" element={<CreatePlan />} />
            <Route path="view-plans" element={<ViewPlans />} />
            <Route path="plan/:pid" element={<ViewPlan />} />
          </Route>
          <Route path="/" element={<PrivateComponents />}>
          <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="all-users" element={<SareUsers />} />
            <Route path="all-plans" element={<SarePlans />} />
            <Route path="user-plans" element={<SingleUser />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <ToastContainer />
        {!isAdmin && <Footer />}
      </div>
    </Router>
  );
};

export default App;
