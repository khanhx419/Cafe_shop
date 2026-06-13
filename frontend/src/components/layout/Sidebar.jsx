import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Coffee, 
  LayoutDashboard, 
  Menu as MenuIcon, 
  ShoppingCart, 
  Package, 
  CreditCard 
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar-container">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Coffee size={28} className="coffee-icon" />
        </div>
        <div className="brand-text">
          <h2>Coffee Corner</h2>
          <span>Cafe & Bistro</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          end
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/menu" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <MenuIcon size={20} />
          <span>Menu & Combos</span>
        </NavLink>

        <NavLink 
          to="/orders" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <ShoppingCart size={20} />
          <span>POS Order</span>
        </NavLink>

        <NavLink 
          to="/inventory" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <Package size={20} />
          <span>Kho Hàng</span>
        </NavLink>

        <NavLink 
          to="/payments" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <CreditCard size={20} />
          <span>Thanh Toán</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="pattern-badge">
          <span>👑 7 Design Patterns Active</span>
        </div>
      </div>
    </aside>
  );
}
