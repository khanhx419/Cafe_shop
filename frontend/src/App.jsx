import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Pages
import Dashboard from './pages/Dashboard';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import InventoryPage from './pages/InventoryPage';
import PaymentPage from './pages/PaymentPage';

function AppContent() {
  const location = useLocation();
  
  // Dynamic page title based on path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Tổng Quan Hệ Thống - Dashboard';
      case '/menu':
        return 'Quản Lý Cây Menu & Combo (Composite / Factory / Prototype)';
      case '/orders':
        return 'Điểm Bán Hàng POS & Decorator Toppings';
      case '/inventory':
        return 'Cây Kho Nguyên Liệu & Command Undo';
      case '/payments':
        return 'Thanh Toán Đa Cổng (Adapter) & In Biên Lai (Singleton)';
      default:
        return 'Coffee Shop Management';
    }
  };

  return (
    <div className="app-container">
      {/* 🧭 Left Sidebar navigation */}
      <Sidebar />

      {/* ☕ Main content viewport */}
      <main className="main-content">
        <Header pageTitle={getPageTitle()} />
        <div className="page-body">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/payments" element={<PaymentPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
