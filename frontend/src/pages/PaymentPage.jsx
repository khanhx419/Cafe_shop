import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  QrCode, 
  Printer, 
  FileText, 
  CheckCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Receipt,
  Download
} from 'lucide-react';
import { ApiService } from '../api/apiClient';
import './PaymentPage.css';

export default function PaymentPage() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  // Active checkout order state
  const [activeCheckoutOrder, setActiveCheckoutOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('MOMO'); // MOMO, VNPAY, BANK_CARD
  const [receiptResult, setReceiptResult] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    // Refresh queue and recent payments
    const allOrders = await ApiService.getOrders();
    // Only display PENDING or PREPARING orders for checkout
    setOrders(allOrders.filter(o => o.status === 'PENDING' || o.status === 'PREPARING'));
    setPayments(await ApiService.getPayments());
  };

  const handleCheckoutClick = (order) => {
    setActiveCheckoutOrder(order);
    setReceiptResult(null);
  };

  // Payment Adapter trigger
  const handleProcessPayment = async () => {
    if (!activeCheckoutOrder) return;

    try {
      // Process payment through Adapted Payment Gateway interface
      const paymentLog = await ApiService.processPayment(
        activeCheckoutOrder.id,
        paymentMethod,
        activeCheckoutOrder.totalPrice
      );

      // Generate EReceipt using Prototype deep cloning
      const receipt = await ApiService.generateReceipt(paymentLog.id);
      
      setReceiptResult(receipt);
      setActiveCheckoutOrder(null);
      refreshData();
      alert(`💳 [Adapter: ${paymentMethod}] Thanh toán thành công! Mã giao dịch: ${paymentLog.transactionId}`);
    } catch (err) {
      alert(err.message);
    }
  };

  // Printer Manager Singleton simulation
  const handlePrintReceipt = (receiptNo) => {
    alert(`🖨️ [PrinterManager - Singleton] Gửi lệnh in cho Biên lai #${receiptNo} tới Máy in nhiệt trung tâm duy nhất tại quầy POS. Tránh xung đột tài nguyên!`);
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="payment-page-container">
      {/* LEFT COLUMN: ACTIVE ORDERS WAITING FOR PAYMENT */}
      <div className="payment-main-column">
        <div className="glass-card billing-card">
          <div className="card-header-flex">
            <div>
              <h3>Hóa Đơn Chờ Thanh Toán</h3>
              <p className="card-subtitle">Chọn đơn hàng POS đang xếp hàng để xử lý thanh toán đa cổng</p>
            </div>
            <span className="order-count-tag">{orders.length} Đang Chờ</span>
          </div>

          <div className="billing-orders-list">
            {orders.length === 0 ? (
              <div className="billing-empty">🎉 Không có đơn hàng nào đang chờ thanh toán!</div>
            ) : (
              orders.map(order => (
                <div 
                  key={order.id} 
                  className={`billing-order-row ${order.isPriority ? 'priority' : ''}`}
                >
                  <div className="billing-row-left">
                    <div className="billing-info">
                      <span className="billing-no">#{String(order.id).slice(-4)}</span>
                      <h4 className="billing-cust">{order.customerName}</h4>
                      {order.isPriority && <span className="vip-badge-small">VIP</span>}
                    </div>
                    
                    <div className="billing-items-summary">
                      {order.items.map((it, idx) => (
                        <span key={idx} className="item-sum-tag">
                          {it.quantity}x {it.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="billing-row-right">
                    <span className="billing-amount">{formatPrice(order.totalPrice)}</span>
                    <button 
                      className="btn btn-primary btn-checkout-action"
                      onClick={() => handleCheckoutClick(order)}
                    >
                      Thanh Toán <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RECENT TRANSACTIONS LOG */}
        <div className="glass-card payments-log-card">
          <h3>Giao Dịch Gần Đây</h3>
          <p className="card-subtitle">Lịch sử thanh toán đã qua các cổng SDK Adapter</p>

          <div className="payments-log-table-wrapper">
            <table className="payments-log-table">
              <thead>
                <tr>
                  <th>Mã Giao Dịch</th>
                  <th>Cổng Thanh Toán</th>
                  <th>Thời Gian</th>
                  <th>Số Tiền</th>
                  <th>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="table-empty">Chưa có giao dịch thanh toán nào được thực hiện.</td>
                  </tr>
                ) : (
                  payments.map(pay => (
                    <tr key={pay.id}>
                      <td className="txn-id-cell">{pay.transactionId}</td>
                      <td>
                        <div className="method-cell">
                          {pay.method === 'MOMO' ? <Smartphone size={14} className="momo-c" /> :
                           pay.method === 'VNPAY' ? <QrCode size={14} className="vnpay-c" /> :
                           <CreditCard size={14} className="visa-c" />}
                          <span className="method-text">{pay.method}</span>
                        </div>
                      </td>
                      <td>{new Date(pay.timestamp).toLocaleTimeString('vi-VN')}</td>
                      <td className="price-cell">{formatPrice(pay.amount)}</td>
                      <td>
                        <span className="badge badge-done">{pay.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: SIMULATOR CHECKOUT / RECEIPTS */}
      <div className="payment-sidebar-column">
        {/* 💳 CHECKOUT SIMULATOR PORTLET */}
        {activeCheckoutOrder && (
          <div className="glass-card pattern-panel active-checkout-box">
            <div className="card-header-flex">
              <div>
                <h3>Thanh Toán Đa Cổng</h3>
                <p className="card-subtitle">Adapter chuyển đổi MOMO/VNPAY/CARD thành giao diện chung</p>
              </div>
              <span className="badge badge-preparing">Pattern: Adapter</span>
            </div>

            <div className="checkout-details-summary">
              <div className="detail-row">
                <span>Mã đơn hàng:</span>
                <span className="val font-display">#{String(activeCheckoutOrder.id).slice(-4)}</span>
              </div>
              <div className="detail-row">
                <span>Khách hàng:</span>
                <span className="val bold">{activeCheckoutOrder.customerName}</span>
              </div>
              <div className="detail-row">
                <span>Số lượng món:</span>
                <span className="val">{activeCheckoutOrder.items.length} món</span>
              </div>
              <div className="detail-total-row">
                <span>Số tiền thanh toán:</span>
                <span className="total-val">{formatPrice(activeCheckoutOrder.totalPrice)}</span>
              </div>
            </div>

            <div className="payment-method-selector">
              <label className="section-title">Chọn Cổng Thanh Toán (Adapter Target):</label>
              
              <div className="method-options-grid">
                <div 
                  className={`method-option momo ${paymentMethod === 'MOMO' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('MOMO')}
                >
                  <Smartphone size={20} />
                  <span>Ví MoMo</span>
                </div>

                <div 
                  className={`method-option vnpay ${paymentMethod === 'VNPAY' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('VNPAY')}
                >
                  <QrCode size={20} />
                  <span>VNPAY QR</span>
                </div>

                <div 
                  className={`method-option visa ${paymentMethod === 'BANK_CARD' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('BANK_CARD')}
                >
                  <CreditCard size={20} />
                  <span>Thẻ Quốc Tế</span>
                </div>
              </div>
            </div>

            <button 
              className="btn btn-success w-full btn-process-checkout"
              onClick={handleProcessPayment}
            >
              <span>Xác nhận Thanh toán (Adapter.pay)</span>
            </button>
          </div>
        )}

        {/* 🧬 PROTOTYPE E-RECEIPT RESULT DISPLAY */}
        {receiptResult && (
          <div className="glass-card pattern-panel receipt-result-box">
            <div className="card-header-flex">
              <div>
                <h3>Biên Lai Điện Tử</h3>
                <p className="card-subtitle">Sản phẩm deep-cloned từ ReceiptPrototype mẫu</p>
              </div>
              <span className="badge badge-preparing">Prototype</span>
            </div>

            <div className="receipt-paper">
              <div className="receipt-header">
                <h3>{receiptResult.header}</h3>
                <p className="receipt-sub">{receiptResult.address}</p>
                <p className="receipt-sub">ĐT: {receiptResult.phone}</p>
                <div className="receipt-dashed"></div>
              </div>

              <div className="receipt-info-block">
                <div className="r-row">
                  <span>Số hóa đơn:</span>
                  <span className="bold">{receiptResult.receiptNumber}</span>
                </div>
                <div className="r-row">
                  <span>Khách hàng:</span>
                  <span>{receiptResult.customerName}</span>
                </div>
                <div className="r-row">
                  <span>Thanh toán:</span>
                  <span>{receiptResult.method}</span>
                </div>
                <div className="r-row">
                  <span>Mã GD:</span>
                  <span className="small-text">{receiptResult.transactionId}</span>
                </div>
                <div className="r-row">
                  <span>Thời gian:</span>
                  <span>{new Date(receiptResult.timestamp).toLocaleString('vi-VN')}</span>
                </div>
              </div>

              <div className="receipt-dashed"></div>

              <div className="receipt-items">
                {receiptResult.items.map((item, idx) => (
                  <div key={idx} className="r-item-row">
                    <div className="r-item-left">
                      <span className="r-item-name">{item.finalDescription}</span>
                      <span className="r-item-qty-price">{item.quantity}x {formatPrice(item.unitPrice)}</span>
                    </div>
                    <span className="r-item-total">{formatPrice(item.finalCost * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-dashed"></div>

              <div className="receipt-total-block">
                <div className="r-row final-total">
                  <span>TỔNG CỘNG:</span>
                  <span>{formatPrice(receiptResult.amountPaid)}</span>
                </div>
              </div>

              <div className="receipt-dashed"></div>

              <div className="receipt-footer">
                <p>{receiptResult.footer}</p>
                <span className="receipt-pattern-note">EReceipt cloned from: {receiptResult.clonedFromPrototype}</span>
              </div>
            </div>

            <div className="receipt-actions">
              <button 
                className="btn btn-secondary flex-1"
                onClick={() => handlePrintReceipt(receiptResult.receiptNumber)}
              >
                <Printer size={16} />
                <span>In Hóa Đơn (Singleton)</span>
              </button>
              <button 
                className="btn btn-primary btn-icon-only-style"
                title="Tải biên lai PDF"
                onClick={() => alert("⬇️ Biên lai điện tử đã được tải xuống thiết bị của bạn thành công!")}
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
