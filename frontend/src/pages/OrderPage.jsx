import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Minus, 
  ShoppingCart, 
  Trash2, 
  User, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { ApiService } from '../api/apiClient';
import './OrderPage.css';

export default function OrderPage() {
  const [menu, setMenu] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [isPriority, setIsPriority] = useState(false); // VIP toggle
  const [orderQueue, setOrderQueue] = useState([]);

  // Customize modal/popover states for Decorator Pattern
  const [customizingItemIndex, setCustomizingItemIndex] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setMenu(await ApiService.getMenuTree());
    setToppings(await ApiService.getToppings());
    setOrderQueue(await ApiService.getOrders());
  };

  const allItems = () => {
    const list = [];
    const traverse = (nodes) => {
      nodes.forEach(n => {
        if (n.componentType === 'ITEM') list.push(n);
        if (n.children) traverse(n.children);
      });
    };
    traverse(menu);
    return list;
  };

  const addToCart = (menuItem) => {
    setCart(prev => {
      // Find if item already exists with NO toppings
      const index = prev.findIndex(item => item.menuItem.id === menuItem.id && item.toppingIds.length === 0);
      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += 1;
        return updated;
      } else {
        return [...prev, {
          id: Date.now() + Math.random(),
          menuItem: menuItem,
          quantity: 1,
          toppingIds: [],
          customDescription: menuItem.name,
          decoratedCost: menuItem.price
        }];
      }
    });
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Topping Decorator Customization Trigger
  const openCustomizer = (index) => {
    setCustomizingItemIndex(index);
    setSelectedToppings(cart[index].toppingIds);
  };

  const toggleTopping = (toppingId) => {
    setSelectedToppings(prev => {
      if (prev.includes(toppingId)) {
        return prev.filter(id => id !== toppingId);
      } else {
        return [...prev, toppingId];
      }
    });
  };

  const saveCustomization = async () => {
    const target = cart[customizingItemIndex];
    const { description, cost } = await ApiService.calculateDecoratedCost(target.menuItem, selectedToppings);

    setCart(prev => {
      const updated = [...prev];
      updated[customizingItemIndex] = {
        ...updated[customizingItemIndex],
        toppingIds: selectedToppings,
        customDescription: description,
        decoratedCost: cost
      };
      return updated;
    });
    setCustomizingItemIndex(null);
    setSelectedToppings([]);
  };

  // Place Order POS (Command Invocation)
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    // Call ApiService to enqueue PlaceOrderCommand in OrderQueue (Singleton)
    const placedOrder = await ApiService.placeOrder({
      customerName: customerName.trim(),
      items: cart,
      isPriority: isPriority
    });

    // Decorate customer name in priority mode if enabled
    if (isPriority) {
      await ApiService.setOrderPriority(placedOrder.id, true);
    }

    // Clear cart & variables
    setCart([]);
    setCustomerName('');
    setIsPriority(false);
    
    refreshData();
    alert("🎉 Đã lưu đơn hàng vào hàng đợi POS thành công! Đang chờ pha chế...");
  };

  const handleUpdateStatus = async (id, status) => {
    await ApiService.updateOrderStatus(id, status);
    refreshData();
  };

  const handleCancelOrder = async (id) => {
    if (window.confirm("Bạn muốn hủy đơn hàng này và thực thi Command.undo()?")) {
      await ApiService.cancelOrder(id);
      refreshData();
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn đơn hàng này khỏi danh sách?")) {
      await ApiService.deleteOrder(id);
      refreshData();
    }
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.decoratedCost * item.quantity), 0);
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="order-page-container">
      {/* 🍕 LEFT PANEL: BEVERAGE GRID */}
      <div className="order-menu-panel">
        <div className="glass-card menu-grid-card">
          <div className="card-header-flex">
            <div>
              <h3>Danh Sách Món Ăn</h3>
              <p className="card-subtitle">Chọn đồ uống/bánh ngọt để thêm vào giỏ hàng POS</p>
            </div>
            <span className="badge badge-preparing">POS Dashboard</span>
          </div>

          <div className="menu-items-grid">
            {allItems().map(item => (
              <div 
                key={item.id} 
                className="pos-item-card"
                onClick={() => addToCart(item)}
              >
                <div className="pos-item-badge">{item.beverageType}</div>
                <div className="pos-item-content">
                  <h4>{item.name}</h4>
                  <p className="pos-item-desc">{item.description || 'Chưa có mô tả'}</p>
                  <div className="pos-item-price-row">
                    <span className="price">{formatPrice(item.price)}</span>
                    <button className="btn-add-item">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🛒 MIDDLE PANEL: POS CART */}
      <div className="order-cart-panel">
        <div className="glass-card cart-card">
          <div className="card-header-flex">
            <div>
              <h3>Giỏ Hàng POS</h3>
              <p className="card-subtitle">Trang trí Decorator Topping cho món nước</p>
            </div>
            <span className="badge badge-preparing">Topping: Decorator</span>
          </div>

          <div className="cart-items-list">
            {cart.length === 0 ? (
              <div className="cart-empty-state">
                <ShoppingCart size={48} className="cart-empty-icon" />
                <p>Giỏ hàng trống. Chọn các món nước bên trái để thêm vào đơn.</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-main">
                    <div className="cart-item-header">
                      <span className="cart-item-qty">{item.quantity}x</span>
                      <h4>{item.menuItem.name}</h4>
                    </div>
                    <p className="cart-item-desc">{item.customDescription}</p>
                    <button 
                      className="btn-decorator-customize"
                      onClick={() => openCustomizer(idx)}
                    >
                      ✨ Thêm Topping (Decorator)
                    </button>
                  </div>

                  <div className="cart-item-actions-panel">
                    <span className="cart-item-price">
                      {formatPrice(item.decoratedCost * item.quantity)}
                    </span>
                    <div className="qty-actions">
                      <button 
                        className="btn-qty" 
                        onClick={() => updateCartQty(item.id, -1)}
                      >
                        <Minus size={12} />
                      </button>
                      <button 
                        className="btn-qty" 
                        onClick={() => updateCartQty(item.id, 1)}
                      >
                        <Plus size={12} />
                      </button>
                      <button 
                        className="btn-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <form onSubmit={handlePlaceOrder} className="cart-checkout-form">
              <div className="form-group">
                <label>Tên Khách Hàng</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Nhập tên khách hàng..."
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* VIP PRIORITY DECORATOR TOGGLE */}
              <div className="priority-decorator-toggle">
                <div className="toggle-info">
                  <span className="toggle-label">⚡ Ưu Tiên VIP (Priority Decorator)</span>
                  <span className="toggle-sub">Gắn cờ đỏ VIP, ưu tiên phục vụ, đưa lên đầu hàng POS</span>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={isPriority}
                    onChange={e => setIsPriority(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="cart-total-row">
                <span>Tổng tiền:</span>
                <span className="total-val">{formatPrice(getCartTotal())}</span>
              </div>

              <button type="submit" className="btn btn-primary w-full btn-place-order">
                <span>Đặt đơn hàng (Command.execute)</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 🧾 RIGHT PANEL: POS QUEUE MONITOR */}
      <div className="order-queue-panel">
        <div className="glass-card queue-card">
          <div className="card-header-flex">
            <div>
              <h3>Hàng Đợi POS</h3>
              <p className="card-subtitle">Theo dõi queue duy nhất (Singleton)</p>
            </div>
            <span className="badge badge-preparing">Singleton Queue</span>
          </div>

          <div className="queue-list">
            {orderQueue.length === 0 ? (
              <div className="queue-empty">Không có đơn hàng nào trong hàng đợi.</div>
            ) : (
              orderQueue.slice().reverse().map(order => (
                <div 
                  key={order.id} 
                  className={`queue-order-card ${order.isPriority ? 'vip' : ''} status-${order.status.toLowerCase()}`}
                >
                  <div className="queue-card-header">
                    <span className="order-number">#{String(order.id).slice(-4)}</span>
                    <span className={`badge badge-${order.status.toLowerCase()}`}>
                      {order.status === 'PENDING' ? 'Đang Chờ' :
                       order.status === 'PREPARING' ? 'Pha Chế' :
                       order.status === 'DONE' ? 'Xong' : 'Hủy'}
                    </span>
                  </div>

                  <h4 className="queue-customer">{order.customerName}</h4>
                  
                  <div className="queue-items">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="queue-item">
                        {it.quantity}x {it.finalDescription}
                      </div>
                    ))}
                  </div>

                  <div className="queue-footer">
                    <span className="queue-total">{formatPrice(order.totalPrice)}</span>
                    
                    <div className="queue-actions">
                      {order.status === 'PENDING' && (
                        <button 
                          className="btn-status-action btn-prep"
                          onClick={() => handleUpdateStatus(order.id, 'PREPARING')}
                        >
                          Pha chế
                        </button>
                      )}
                      {order.status === 'PREPARING' && (
                        <button 
                          className="btn-status-action btn-done"
                          onClick={() => handleUpdateStatus(order.id, 'DONE')}
                        >
                          Xong
                        </button>
                      )}
                      {order.status !== 'DONE' && order.status !== 'CANCELLED' && (
                        <button 
                          className="btn-status-action btn-cancel"
                          onClick={() => handleCancelOrder(order.id)}
                          title="Hủy đơn (Command Undo)"
                        >
                          Hủy
                        </button>
                      )}
                      {(order.status === 'DONE' || order.status === 'CANCELLED') && (
                        <button 
                          className="btn-status-action"
                          onClick={() => handleDeleteOrder(order.id)}
                          title="Xóa vĩnh viễn khỏi danh sách"
                          style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 🛠️ TOPPING DECORATOR CUSTOMIZER MODAL */}
      {customizingItemIndex !== null && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">
                Trang Trí Topping (Decorator Pattern)
              </h3>
              <span className="modal-close" onClick={() => setCustomizingItemIndex(null)}>✕</span>
            </div>

            <div className="modal-body">
              <p className="modal-body-sub">
                Đóng gói đồ uống gốc [<b>{cart[customizingItemIndex].menuItem.name}</b>] bằng các lớp Toppings tăng cường:
              </p>

              <div className="toppings-selection-grid">
                {toppings.map(topping => {
                  const isChecked = selectedToppings.includes(topping.id);
                  return (
                    <div 
                      key={topping.id}
                      className={`topping-selection-card ${isChecked ? 'active' : ''}`}
                      onClick={() => toggleTopping(topping.id)}
                    >
                      <div className="topping-checkbox">
                        {isChecked ? <div className="inner-checked"></div> : null}
                      </div>
                      <div className="topping-details">
                        <span className="topping-name">{topping.name}</span>
                        <span className="topping-price">+{formatPrice(topping.price)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* LIVE DECORATOR PREVIEW */}
              <div className="decorator-preview-box">
                <span className="preview-label">Mô phỏng wrapping của Decorator:</span>
                <div className="decorator-stack-visualization">
                  <div className="stack-layer layer-topping">
                    {selectedToppings.length === 0 ? "Không có topping" : selectedToppings.map(id => toppings.find(t => t.id === id)?.name).join(' + ')}
                  </div>
                  <div className="stack-layer layer-beverage">
                    {cart[customizingItemIndex].menuItem.name} ({formatPrice(cart[customizingItemIndex].menuItem.price)})
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setCustomizingItemIndex(null)}
              >
                Hủy bỏ
              </button>
              <button 
                className="btn btn-primary"
                onClick={saveCustomization}
              >
                Áp dụng Decorator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
