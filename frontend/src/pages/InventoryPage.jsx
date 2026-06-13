import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Minus, 
  Undo2, 
  History, 
  Sparkles, 
  Layers,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  User,
  AlertTriangle
} from 'lucide-react';
import { ApiService } from '../api/apiClient';
import './InventoryPage.css';

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [history, setHistory] = useState([]);
  const [expandedContainers, setExpandedContainers] = useState({ 10: true, 20: true, 30: true });

  // Form states for Import/Export Command
  const [selectedItemId, setSelectedItemId] = useState('');
  const [actionType, setActionType] = useState('IMPORT'); // IMPORT / EXPORT
  const [actionQty, setActionQty] = useState('');
  const [performedBy, setPerformedBy] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setInventory(await ApiService.getInventoryTree());
    setHistory(await ApiService.getInventoryHistory());
  };

  const toggleContainer = (id) => {
    setExpandedContainers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const allItems = () => {
    const list = [];
    const traverse = (nodes) => {
      nodes.forEach(n => {
        if (n.componentType === 'ITEM') list.push(n);
        if (n.children) traverse(n.children);
      });
    };
    traverse(inventory);
    return list;
  };

  // Set default selected item
  useEffect(() => {
    const items = allItems();
    if (items.length > 0 && !selectedItemId) {
      setSelectedItemId(items[0].id);
    }
  }, [inventory]);

  // Execute Inventory Command
  const handleExecuteCommand = async (e) => {
    e.preventDefault();
    if (!selectedItemId || !actionQty || !performedBy) {
      alert("Vui lòng điền đầy đủ thông tin giao dịch!");
      return;
    }

    try {
      // Execute command through invoker
      const log = await ApiService.executeInventoryCommand(
        actionType,
        Number(selectedItemId),
        Number(actionQty),
        performedBy
      );

      setActionQty('');
      refreshData();
      alert(`🎉 Đã chạy [${actionType === 'IMPORT' ? 'ImportCommand' : 'ExportCommand'}]. Số lượng thay đổi: ${actionQty}`);
    } catch (err) {
      alert(err.message);
    }
  };

  // Undo Last Command
  const handleUndo = async () => {
    try {
      const undoneCommand = await ApiService.undoLastInventoryCommand();
      refreshData();
      alert(`⏪ Hoàn tác thành công! Đã đảo ngược [${undoneCommand.actionType}] món [${undoneCommand.itemName}] (${undoneCommand.quantityChanged}đơn vị)`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="inventory-page-container">
      {/* LEFT COLUMN: COMPOSITE INVENTORY STRUCTURE */}
      <div className="inventory-main-column">
        <div className="glass-card inventory-tree-card">
          <div className="card-header-flex">
            <div>
              <h3>Composite Kho Hàng</h3>
              <p className="card-subtitle">Phân tầng cấu trúc Containers (Composite) & Nguyên liệu (Leaf) đệ quy</p>
            </div>
            <span className="badge badge-preparing">Pattern: Composite</span>
          </div>

          <div className="inventory-tree">
            {inventory.map(container => (
              <div key={container.id} className="tree-container-group">
                <div 
                  className="tree-container-header" 
                  onClick={() => toggleContainer(container.id)}
                >
                  <div className="container-title">
                    <Layers size={20} className="container-icon" />
                    <span>{container.name}</span>
                  </div>
                  <div className="container-meta">
                    <span className="count-badge">{container.children?.length || 0} mục</span>
                    <ChevronRight size={16} className={`chevron-icon ${expandedContainers[container.id] ? 'rotated' : ''}`} />
                  </div>
                </div>

                {expandedContainers[container.id] && (
                  <div className="tree-items-list">
                    {container.children?.length === 0 ? (
                      <div className="tree-item-empty">Không có mặt hàng nào.</div>
                    ) : (
                      container.children?.map(item => (
                        <div key={item.id} className="inventory-item-row">
                          <div className="item-info">
                            <span className="item-dot"></span>
                            <div>
                              <h4>{item.name}</h4>
                              <p className="item-unit">Đơn vị tính: {item.unit}</p>
                            </div>
                          </div>

                          <div className="item-quantity-status">
                            {item.quantity < 20 && (
                              <span className="low-stock-alert" title="Sắp hết hàng!">
                                <AlertTriangle size={14} />
                              </span>
                            )}
                            <span className={`qty-value ${item.quantity < 20 ? 'low' : ''}`}>
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: IMPORT/EXPORT COMMANDS & UNDO STACK */}
      <div className="inventory-sidebar-column">
        {/* 📦 IMPORT/EXPORT STOCK FORM */}
        <div className="glass-card pattern-panel">
          <div className="card-header-flex">
            <div>
              <h3>Inventory Command</h3>
              <p className="card-subtitle">Đóng gói thao tác Kho thành đối tượng độc lập</p>
            </div>
            <span className="badge badge-preparing">Command Pattern</span>
          </div>

          <form onSubmit={handleExecuteCommand} className="pattern-form">
            <div className="form-group">
              <label>Chọn Nguyên Liệu</label>
              <select 
                className="form-select"
                value={selectedItemId}
                onChange={e => setSelectedItemId(e.target.value)}
              >
                {allItems().map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.quantity} {item.unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Loại Giao Dịch</label>
                <div className="action-type-selector">
                  <button 
                    type="button"
                    className={`btn-action-type import ${actionType === 'IMPORT' ? 'active' : ''}`}
                    onClick={() => setActionType('IMPORT')}
                  >
                    <Plus size={16} /> Nhập kho
                  </button>
                  <button 
                    type="button"
                    className={`btn-action-type export ${actionType === 'EXPORT' ? 'active' : ''}`}
                    onClick={() => setActionType('EXPORT')}
                  >
                    <Minus size={16} /> Xuất kho
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Số Lượng</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="Ví dụ: 10"
                  value={actionQty}
                  onChange={e => setActionQty(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Người Thực Hiện</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Tên thủ kho / quản lý..."
                  value={performedBy}
                  onChange={e => setPerformedBy(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              <span>Chạy Command.execute()</span>
            </button>
          </form>
        </div>

        {/* ⏪ COMMAND HISTORY & UNDO SYSTEM */}
        <div className="glass-card pattern-panel">
          <div className="card-header-flex">
            <div>
              <h3>Command History</h3>
              <p className="card-subtitle">Lịch sử giao dịch & Hoàn tác (Undo Stack)</p>
            </div>
            <button 
              className="btn-undo-action"
              onClick={handleUndo}
              title="Khôi phục trạng thái cũ"
              disabled={history.filter(h => !h.undone).length === 0}
            >
              <Undo2 size={16} />
              <span>Undo Last Command</span>
            </button>
          </div>

          <div className="inventory-log-list">
            {history.length === 0 ? (
              <div className="history-empty">Chưa có giao dịch kho nào được ghi lại.</div>
            ) : (
              history.map(log => (
                <div 
                  key={log.id} 
                  className={`log-history-card ${log.undone ? 'undone' : ''} ${log.actionType.toLowerCase()}`}
                >
                  <div className="log-header-flex">
                    <span className="log-action-tag">
                      {log.actionType === 'IMPORT' ? 'NHẬP KHO' : 'XUẤT KHO'}
                    </span>
                    <span className="log-time">
                      {new Date(log.timestamp).toLocaleTimeString('vi-VN')}
                    </span>
                  </div>

                  <h4 className="log-title">
                    {log.itemName} ({log.quantityChanged} đơn vị)
                  </h4>

                  <div className="log-footer-flex">
                    <span className="log-user">Thực hiện: {log.performedBy}</span>
                    <span className="log-details">
                      {log.quantityBefore} ➔ {log.quantityAfter}
                    </span>
                  </div>

                  {log.undone && (
                    <div className="undone-overlay">
                      <span>⏪ ĐÃ HOÀN TÁC (UNDONE)</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
