import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../views/Home/Home';
import LoginView from '../views/Login/LoginView';
import DashboardView from '../views/Dashboard/DashboardView';
import ProtectedRoute from '../guards/ProtectedRoute';
import Navbar from '../components/shared/Navbar/Navbar';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginView />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardView />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
