import React, { useState, useEffect } from 'react';
import { Clock, Coffee, ShieldAlert } from 'lucide-react';
import './Header.css';

export default function Header({ pageTitle }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <h1 className="header-page-title">{pageTitle}</h1>
      </div>

      <div className="header-right">
        {/* Offline local sandbox status widget */}
        <div className="sandbox-widget">
          <ShieldAlert size={16} className="sandbox-icon" />
          <span className="sandbox-text">Local Storage Sandbox Mode (Active)</span>
        </div>

        <div className="time-widget">
          <Clock size={16} className="clock-icon" />
          <span className="time-text">{formatTime(time)}</span>
          <span className="divider">|</span>
          <span className="date-text">{formatDate(time)}</span>
        </div>

        <div className="user-profile">
          <div className="profile-avatar">
            <span>CH</span>
          </div>
          <div className="profile-info">
            <span className="profile-name">Cửa Hàng Trưởng</span>
            <span className="profile-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
