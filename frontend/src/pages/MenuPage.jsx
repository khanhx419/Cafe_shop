import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  FolderOpen, 
  Coffee, 
  Plus, 
  Trash2, 
  Copy, 
  ChevronRight, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { ApiService } from '../api/apiClient';
import './MenuPage.css';

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [combos, setCombos] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({ 1: true, 2: true, 3: true });
  
  // Form states for Factory Method Beverage Creation
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemType, setNewItemType] = useState('COFFEE');
  const [selectedParentId, setSelectedParentId] = useState(2); // Default to cold drinks
  const [newItemDesc, setNewItemDesc] = useState('');

  // Form state for Prototype Combo Cloning
  const [selectedComboId, setSelectedComboId] = useState(501);
  const [comboCustomerName, setComboCustomerName] = useState('');
  const [clonedComboMsg, setClonedComboMsg] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setMenu(await ApiService.getMenuTree());
    setCombos(await ApiService.getCombos());
  };

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Factory Method Demo: Create Beverage
  const handleCreateBeverage = async (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) {
      alert("Vui lòng điền đầy đủ Tên và Giá món!");
      return;
    }

    // Call API/Service which delegates to BeverageFactory
    await ApiService.addMenuItem(selectedParentId, {
      name: newItemName,
      price: newItemPrice,
      beverageType: newItemType,
      description: newItemDesc
    });

    // Reset Form
    setNewItemName('');
    setNewItemPrice('');
    setNewItemDesc('');
    
    refreshData();
    
    // Smooth scroll or notify
    alert(`🎉 Đã dùng [Factory Method] để tạo Beverage loại [${newItemType}] thành công!`);
  };

  // Prototype Demo: Clone Combo
  const handleCloneCombo = async (e) => {
    e.preventDefault();
    if (!comboCustomerName) {
      alert("Vui lòng nhập tên khách hàng nhận Combo!");
      return;
    }

    // Call Service which does prototype.clone() (DEEP COPY)
    const { clonedCombo, discountedPrice } = await ApiService.cloneCombo(selectedComboId, comboCustomerName);
    
    setClonedComboMsg({
      name: clonedCombo.name,
      originalPrice: clonedCombo.items.reduce((sum, i) => sum + (i.price * i.quantity), 0),
      discountedPrice: discountedPrice,
      discountPercent: clonedCombo.discountPercent
    });

    setComboCustomerName('');
    refreshData();
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa món ăn này khỏi Composite Menu?")) {
      await ApiService.deleteMenuItem(id);
      refreshData();
    }
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="menu-page-container">
      {/* LEFT COLUMN: COMPOSITE TREE STRUCTURE */}
      <div className="menu-main-column">
        <div className="glass-card menu-tree-card">
          <div className="card-header-flex">
            <div>
              <h3>Composite Menu Tree</h3>
              <p className="card-subtitle">Xử lý đệ quy đồng nhất Danh mục (Composite) & Món ăn lẻ (Leaf)</p>
            </div>
            <span className="badge badge-preparing">Pattern: Composite</span>
          </div>

          <div className="menu-tree">
            {menu.map(category => (
              <div key={category.id} className="tree-category-group">
                <div 
                  className="tree-category-header" 
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="category-title">
                    {expandedCategories[category.id] ? <FolderOpen size={20} className="cat-icon-open" /> : <Folder size={20} className="cat-icon-closed" />}
                    <span>{category.name}</span>
                  </div>
                  <div className="category-meta">
                    <span className="count-badge">{category.children?.length || 0} món</span>
                    <ChevronRight size={16} className={`chevron-icon ${expandedCategories[category.id] ? 'rotated' : ''}`} />
                  </div>
                </div>

                {expandedCategories[category.id] && (
                  <div className="tree-items-list">
                    {category.children?.length === 0 ? (
                      <div className="tree-item-empty">Không có món nào trong danh mục này.</div>
                    ) : (
                      category.children?.map(item => (
                        <div key={item.id} className="tree-item-row">
                          <div className="item-info">
                            <div className="item-avatar">
                              <Coffee size={16} />
                            </div>
                            <div>
                              <div className="item-name-flex">
                                <h4>{item.name}</h4>
                                <span className="beverage-type-tag">{item.beverageType}</span>
                              </div>
                              <p className="item-desc">{item.description || 'Chưa có mô tả món'}</p>
                            </div>
                          </div>

                          <div className="item-actions">
                            <span className="item-price">{formatPrice(item.price)}</span>
                            <button 
                              className="btn-delete"
                              onClick={() => handleDeleteItem(item.id)}
                              title="Xóa khỏi Composite Menu"
                            >
                              <Trash2 size={16} />
                            </button>
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

      {/* RIGHT COLUMN: FACTORY METHOD & PROTOTYPE PATTERNS */}
      <div className="menu-sidebar-column">
        {/* ☕ FACTORY METHOD DEMO */}
        <div className="glass-card pattern-panel">
          <div className="card-header-flex">
            <div>
              <h3>Beverage Factory</h3>
              <p className="card-subtitle">Factory Method tạo đồ uống động</p>
            </div>
            <span className="badge badge-preparing">Factory Method</span>
          </div>

          <form onSubmit={handleCreateBeverage} className="pattern-form">
            <div className="form-group">
              <label>Tên Đồ Uống / Món Ăn</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Ví dụ: Cà phê cốt dừa"
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                required
              />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Giá Bán (VND)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="35000"
                  value={newItemPrice}
                  onChange={e => setNewItemPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Loại Beverage</label>
                <select 
                  className="form-select"
                  value={newItemType}
                  onChange={e => setNewItemType(e.target.value)}
                >
                  <option value="COFFEE">COFFEE</option>
                  <option value="MILK_TEA">MILK_TEA</option>
                  <option value="SMOOTHIE">SMOOTHIE</option>
                  <option value="PASTRY">PASTRY</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Thuộc Danh Mục Composite</label>
              <select 
                className="form-select"
                value={selectedParentId}
                onChange={e => setSelectedParentId(Number(e.target.value))}
              >
                {menu.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Mô tả công thức</label>
              <textarea 
                className="form-input form-textarea" 
                rows="2"
                placeholder="Pha phin + nước cốt dừa xay nhuyễn..."
                value={newItemDesc}
                onChange={e => setNewItemDesc(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              <Plus size={18} />
              <span>Chạy BeverageFactory.create()</span>
            </button>
          </form>
        </div>

        {/* 🧬 PROTOTYPE PATTERN DEMO */}
        <div className="glass-card pattern-panel">
          <div className="card-header-flex">
            <div>
              <h3>Prototype Registry</h3>
              <p className="card-subtitle">Deep Clone combo mẫu tiết kiệm chi phí khởi tạo</p>
            </div>
            <span className="badge badge-preparing">Prototype</span>
          </div>

          <form onSubmit={handleCloneCombo} className="pattern-form">
            <div className="form-group">
              <label>Chọn Combo Mẫu (Prototype)</label>
              <select 
                className="form-select"
                value={selectedComboId}
                onChange={e => setSelectedComboId(Number(e.target.value))}
              >
                {combos.map(combo => (
                  <option key={combo.id} value={combo.id}>
                    {combo.name} (Giảm {combo.discountPercent}%)
                  </option>
                ))}
              </select>
            </div>

            <div className="combo-preview-box">
              <div className="preview-header">
                <ShoppingBag size={14} />
                <span>Chi tiết Combo Prototype gốc:</span>
              </div>
              <ul>
                <li>1x Cà phê sữa đá (29.000đ)</li>
                <li>1x Bánh Croissant (25.000đ)</li>
                <li className="original-cost">Tổng gốc: 54.000đ</li>
              </ul>
            </div>

            <div className="form-group">
              <label>Nhập Tên Khách Hàng đặt Combo</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Tên Khách Hàng VIP..."
                value={comboCustomerName}
                onChange={e => setComboCustomerName(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-secondary w-full btn-clone-pattern">
              <Copy size={18} />
              <span>Chạy comboTemplate.clone()</span>
            </button>
          </form>

          {clonedComboMsg && (
            <div className="cloned-combo-result">
              <div className="result-header">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Kết Quả Deep Clone Thành Công!</span>
              </div>
              <p className="cloned-name">{clonedComboMsg.name}</p>
              <div className="price-comparison">
                <span className="old-p">{formatPrice(clonedComboMsg.originalPrice)}</span>
                <span className="new-p">{formatPrice(clonedComboMsg.discountedPrice)}</span>
              </div>
              <span className="clone-info-note">Bản clone độc lập đã được lưu vào hệ thống, không làm thay đổi bản gốc Prototype!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
