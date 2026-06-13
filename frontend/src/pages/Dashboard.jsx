import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  AlertTriangle, 
  Users, 
  ArrowUpRight, 
  TrendingUp,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ApiService } from '../api/apiClient';
import './Dashboard.css';

export default function Dashboard() {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setMenu(await ApiService.getMenuTree());
      setOrders(await ApiService.getOrders());
      setInventory(await ApiService.getInventoryTree());
      setHistory(await ApiService.getInventoryHistory());
    };
    fetchData();
  }, []);

  // Compute Statistics
  const completedOrders = orders.filter(o => o.status === 'DONE');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalOrdersCount = orders.length;
  
  // Find Low Stock items
  const lowStockItems = [];
  const findLowStock = (nodes) => {
    nodes.forEach(n => {
      if (n.componentType === 'ITEM' && n.quantity < 20) {
        lowStockItems.push(n);
      }
      if (n.children) findLowStock(n.children);
    });
  };
  findLowStock(inventory);

  // Sales Chart Mock Data
  const chartData = [
    { name: 'T2', sales: 1250000 },
    { name: 'T3', sales: 1850000 },
    { name: 'T4', sales: 1450000 },
    { name: 'T5', sales: 2200000 },
    { name: 'T6', sales: 2900000 },
    { name: 'T7', sales: 3400000 },
    { name: 'CN', sales: totalRevenue > 0 ? totalRevenue : 4100000 }
  ];

  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="dashboard-container">
      {/* 🚀 STATS GRID */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper revenue">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Doanh Thu Hôm Nay</span>
            <h3 className="stat-value">{formatPrice(totalRevenue)}</h3>
            <span className="stat-trend success">
              <TrendingUp size={14} /> +12.5% so với hôm qua
            </span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper orders">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Tổng Đơn Hàng</span>
            <h3 className="stat-value">{totalOrdersCount} đơn</h3>
            <span className="stat-trend success">
              <TrendingUp size={14} /> +5.2% so với hôm qua
            </span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper stock-alert">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Cảnh Báo Hết Hàng</span>
            <h3 className="stat-value">{lowStockItems.length} mặt hàng</h3>
            <span className="stat-trend warning">
              Nguyên liệu dưới 20 đơn vị
            </span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper users">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Lượng Khách POS</span>
            <h3 className="stat-value">{orders.filter(o => o.status !== 'CANCELLED').length} khách</h3>
            <span className="stat-trend success">
              <TrendingUp size={14} /> Đang hoạt động
            </span>
          </div>
        </div>
      </div>

      {/* 📊 CHART & RECENT HISTORY BLOCK */}
      <div className="dashboard-charts-grid">
        {/* Sales Area Chart */}
        <div className="glass-card chart-card">
          <div className="card-header-flex">
            <div>
              <h3>Xu Hướng Doanh Thu</h3>
              <p className="card-subtitle">Thống kê doanh thu tuần này</p>
            </div>
            <span className="growth-indicator">+18% Tuần Này</span>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} />
                <YAxis stroke="var(--text-secondary)" tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-card)', 
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }} 
                  formatter={(value) => [formatPrice(value), 'Doanh thu']}
                />
                <Area type="monotone" dataKey="sales" stroke="var(--accent-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Ingredient Panel */}
        <div className="glass-card stock-alert-card">
          <h3>Cảnh Báo Tồn Kho</h3>
          <p className="card-subtitle">Nguyên liệu cần mua thêm gấp</p>

          <div className="low-stock-list">
            {lowStockItems.length === 0 ? (
              <div className="empty-stock-state">
                <span>✅ Tất cả nguyên liệu đều ổn định</span>
              </div>
            ) : (
              lowStockItems.map(item => (
                <div key={item.id} className="stock-alert-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Hiện có: {item.quantity} {item.unit}</span>
                  </div>
                  <div className="stock-progress-container">
                    <div 
                      className={`stock-progress-bar ${item.quantity < 10 ? 'danger' : 'warning'}`}
                      style={{ width: `${Math.min(100, (item.quantity / 20) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 🧾 RECENT ORDERS QUEUE */}
      <div className="recent-orders-card glass-card">
        <div className="card-header-flex">
          <div>
            <h3>Đơn Hàng POS Hiện Tại</h3>
            <p className="card-subtitle">Danh sách đơn hàng trong hệ thống xếp hàng POS</p>
          </div>
          <span className="order-count-tag">{orders.length} Đơn Hàng</span>
        </div>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Khách Hàng</th>
                <th>Chi Tiết Món Ăn</th>
                <th>Thứ Tự POS</th>
                <th>Thời Gian</th>
                <th>Trạng Thái</th>
                <th>Tổng Cộng</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty">Không có đơn hàng nào hiện tại.</td>
                </tr>
              ) : (
                orders.slice(-5).reverse().map(order => (
                  <tr key={order.id} className={order.isPriority ? 'vip-row' : ''}>
                    <td>
                      <div className="customer-info-cell">
                        <span className="customer-name">{order.customerName}</span>
                        {order.isPriority && <span className="vip-tag">VIP</span>}
                      </div>
                    </td>
                    <td className="items-cell">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="order-item-desc">
                          {it.quantity}x {it.finalDescription}
                        </div>
                      ))}
                    </td>
                    <td>
                      <span className="pos-queue-tag">
                        Queue #{String(order.id).slice(-4)}
                      </span>
                    </td>
                    <td>
                      <div className="time-cell">
                        <Clock size={12} />
                        <span>{new Date(order.createdAt).toLocaleTimeString('vi-VN')}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${order.status.toLowerCase()}`}>
                        {order.status === 'PENDING' ? 'Đang Chờ' :
                         order.status === 'PREPARING' ? 'Pha Chế' :
                         order.status === 'DONE' ? 'Hoàn Tất' : 'Hủy bỏ'}
                      </span>
                    </td>
                    <td className="price-cell">{formatPrice(order.totalPrice)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
