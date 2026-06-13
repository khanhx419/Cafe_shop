/* ==========================================================================
   ☕ MOCK DATABASE & DESIGN PATTERNS SERVICE FOR CLIENT-SIDE TESTING
   ========================================================================== */

// Helper to load/save data from LocalStorage
const loadFromStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- INITIAL STATE / SEED DATA ---
const defaultMenu = [
  {
    id: 1,
    name: "Đồ uống nóng",
    componentType: "CATEGORY",
    description: "Các loại đồ uống nóng ấm áp",
    children: [
      { id: 101, name: "Cà phê đen nóng", componentType: "ITEM", price: 25000, beverageType: "COFFEE", description: "Cà phê đen pha phin nguyên chất" },
      { id: 102, name: "Cà phê sữa nóng", componentType: "ITEM", price: 29000, beverageType: "COFFEE", description: "Cà phê phin thơm lừng với sữa đặc" }
    ]
  },
  {
    id: 2,
    name: "Đồ uống lạnh",
    componentType: "CATEGORY",
    description: "Các món giải nhiệt tươi mát",
    children: [
      { id: 201, name: "Cà phê sữa đá", componentType: "ITEM", price: 29000, beverageType: "COFFEE", description: "Cà phê sữa đá pha phin truyền thống" },
      { id: 202, name: "Trà sữa Oolong", componentType: "ITEM", price: 35000, beverageType: "MILK_TEA", description: "Trà sữa Oolong thượng hạng" },
      { id: 203, name: "Trà sữa Truyền thống", componentType: "ITEM", price: 30000, beverageType: "MILK_TEA", description: "Trà sữa truyền thống đậm vị trà" },
      { id: 204, name: "Sinh tố Bơ", componentType: "ITEM", price: 40000, beverageType: "SMOOTHIE", description: "Sinh tố bơ sáp béo ngậy" },
      { id: 205, name: "Sinh tố Dâu", componentType: "ITEM", price: 38000, beverageType: "SMOOTHIE", description: "Sinh tố dâu tây tươi chua ngọt" }
    ]
  },
  {
    id: 3,
    name: "Bánh ngọt",
    componentType: "CATEGORY",
    description: "Bánh tươi ăn kèm hoàn hảo",
    children: [
      { id: 301, name: "Bánh Croissant", componentType: "ITEM", price: 25000, beverageType: "PASTRY", description: "Bánh sừng bò Pháp giòn thơm bơ" },
      { id: 302, name: "Bánh Tiramisu", componentType: "ITEM", price: 35000, beverageType: "PASTRY", description: "Bánh tiramisu vị cà phê cacao Ý" }
    ]
  }
];

const defaultToppings = [
  { id: "t1", name: "Trân châu hoàng kim", price: 5000, available: true },
  { id: "t2", name: "Thạch sương sáo", price: 5000, available: true },
  { id: "t3", name: "Kem tươi Macchiato", price: 7000, available: true },
  { id: "t4", name: "Pudding trứng", price: 6000, available: true }
];

const defaultCombos = [
  {
    id: 501,
    name: "Combo Bữa Sáng",
    description: "Cà phê sữa đá + Bánh Croissant (Tiết kiệm 10%)",
    discountPercent: 10,
    items: [
      { itemId: 201, name: "Cà phê sữa đá", price: 29000, quantity: 1 },
      { itemId: 301, name: "Bánh Croissant", price: 25000, quantity: 1 }
    ],
    isTemplate: true
  }
];

const defaultInventory = [
  {
    id: 10,
    name: "Khu Nguyên liệu Cà phê",
    componentType: "CONTAINER",
    children: [
      { id: 1001, name: "Cà phê hạt Arabica", componentType: "ITEM", unit: "kg", quantity: 20 },
      { id: 1002, name: "Cà phê hạt Robusta", componentType: "ITEM", unit: "kg", quantity: 15 },
      { id: 1003, name: "Sữa tươi Đà Lạt Milk", componentType: "ITEM", unit: "L", quantity: 50 }
    ]
  },
  {
    id: 20,
    name: "Khu Nguyên liệu Trà",
    componentType: "CONTAINER",
    children: [
      { id: 2001, name: "Trà xanh Oolong lá", componentType: "ITEM", unit: "kg", quantity: 10 },
      { id: 2002, name: "Bột kem béo sữa", componentType: "ITEM", unit: "kg", quantity: 30 }
    ]
  },
  {
    id: 30,
    name: "Khu Toppings & Bánh",
    componentType: "CONTAINER",
    children: [
      { id: 3001, name: "Trân châu sống", componentType: "ITEM", unit: "kg", quantity: 25 },
      { id: 3002, name: "Bột làm thạch sương sáo", componentType: "ITEM", unit: "kg", quantity: 18 }
    ]
  }
];

const defaultOrders = [];
const defaultInventoryHistory = [];
const defaultPayments = [];

// ==========================================================================
// 🛡️ PATTERN DEMO IMPLEMENTATIONS
// ==========================================================================

export const MockService = {
  // --- MENU COMPOSITE PATTERN ---
  getMenuTree: () => loadFromStorage("cafe_menu", defaultMenu),
  
  saveMenuTree: (menu) => saveToStorage("cafe_menu", menu),

  addMenuItem: (parentId, itemData) => {
    const menu = MockService.getMenuTree();
    // Factory method representation inside: createBeverage based on drink type
    const newId = Date.now();
    const newItem = {
      id: newId,
      name: itemData.name,
      componentType: "ITEM",
      price: Number(itemData.price),
      beverageType: itemData.beverageType || "COFFEE",
      description: itemData.description || ""
    };

    const addToCategory = (list) => {
      for (let cat of list) {
        if (cat.id === parentId) {
          if (!cat.children) cat.children = [];
          cat.children.push(newItem);
          return true;
        }
        if (cat.children && addToCategory(cat.children)) return true;
      }
      return false;
    };

    addToCategory(menu);
    MockService.saveMenuTree(menu);
    return newItem;
  },

  deleteMenuItem: (itemId) => {
    const menu = MockService.getMenuTree();
    const deleteFromCategory = (list) => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === itemId) {
          list.splice(i, 1);
          return true;
        }
        if (list[i].children) {
          if (deleteFromCategory(list[i].children)) return true;
        }
      }
      return false;
    };
    deleteFromCategory(menu);
    MockService.saveMenuTree(menu);
  },

  // --- PROTOTYPE PATTERN: CLONE COMBO ---
  getCombos: () => loadFromStorage("cafe_combos", defaultCombos),
  
  cloneCombo: (comboId, customerName) => {
    const combos = MockService.getCombos();
    const targetTemplate = combos.find(c => c.id === comboId);
    if (!targetTemplate) throw new Error("Combo template not found!");

    // DEEP COPY (PROTOTYPE CLONE)
    const clonedCombo = {
      ...targetTemplate,
      id: Date.now(),
      name: `${targetTemplate.name} (Khách: ${customerName})`,
      isTemplate: false,
      clonedFromId: targetTemplate.id,
      createdAt: new Date().toISOString()
    };

    // Save active combo to orders
    const menu = MockService.getMenuTree();
    const menuItems = [];
    
    // Find item IDs in menu to fetch actual details
    const findInMenu = (id) => {
      const allItems = [];
      const traverse = (nodes) => {
        for (let n of nodes) {
          if (n.componentType === "ITEM") allItems.push(n);
          if (n.children) traverse(n.children);
        }
      };
      traverse(menu);
      return allItems.find(i => i.id === id);
    };

    // Calculate total combo cost with discount
    let rawTotal = 0;
    clonedCombo.items.forEach(comboItem => {
      const actualItem = findInMenu(comboItem.itemId);
      const price = actualItem ? actualItem.price : comboItem.price;
      rawTotal += price * comboItem.quantity;
    });

    const discountedPrice = rawTotal * (1 - (clonedCombo.discountPercent / 100));
    
    return {
      clonedCombo,
      discountedPrice
    };
  },

  // --- DECORATOR PATTERN: ADD TOPPINGS TO BEVERAGE & VIP PRIORITY ---
  getToppings: () => loadFromStorage("cafe_toppings", defaultToppings),

  calculateDecoratedCost: (baseItem, selectedToppingIds) => {
    // ☕ Decorator Logic Simulator
    let description = baseItem.name;
    let cost = baseItem.price;
    const toppings = MockService.getToppings();

    selectedToppingIds.forEach(id => {
      const topping = toppings.find(t => t.id === id);
      if (topping) {
        cost += topping.price;
        description += ` + ${topping.name}`;
      }
    });

    return {
      description,
      cost
    };
  },

  // --- COMMAND PATTERN & SINGLETON ORDER QUEUE ---
  getOrders: () => loadFromStorage("cafe_orders", defaultOrders),

  placeOrder: (orderData) => {
    const orders = MockService.getOrders();
    
    // Create new PlaceOrderCommand
    const newOrder = {
      id: Date.now(),
      customerName: orderData.customerName || "Khách Vãng Lai",
      items: orderData.items.map(item => {
        const costDetails = MockService.calculateDecoratedCost(item.menuItem, item.toppingIds);
        return {
          itemId: item.menuItem.id,
          name: item.menuItem.name,
          quantity: item.quantity,
          unitPrice: item.menuItem.price,
          toppingIds: item.toppingIds,
          toppingTotal: costDetails.cost - item.menuItem.price,
          finalDescription: costDetails.description,
          finalCost: costDetails.cost
        };
      }),
      isPriority: orderData.isPriority || false, // Priority Decorator
      status: "PENDING", // PENDING -> PREPARING -> DONE -> CANCELLED
      totalPrice: 0,
      createdAt: new Date().toISOString()
    };

    newOrder.totalPrice = newOrder.items.reduce((sum, item) => sum + (item.finalCost * item.quantity), 0);

    // Singleton implementation check: push to general queue
    orders.push(newOrder);
    saveToStorage("cafe_orders", orders);
    return newOrder;
  },

  setOrderPriority: (orderId, isPriority) => {
    // ⚡ PriorityDecorator representation: dynamically decorates standard order with VIP traits
    const orders = MockService.getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].isPriority = isPriority;
      orders[orderIndex].customerName = isPriority 
        ? `⚡ [VIP ƯU TIÊN] ${orders[orderIndex].customerName.replace("⚡ [VIP ƯU TIÊN] ", "")}`
        : orders[orderIndex].customerName.replace("⚡ [VIP ƯU TIÊN] ", "");
      saveToStorage("cafe_orders", orders);
    }
    return orders[orderIndex];
  },

  cancelOrder: (orderId) => {
    // Command undo representation: cancel order
    const orders = MockService.getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = "CANCELLED";
      saveToStorage("cafe_orders", orders);
    }
  },

  updateOrderStatus: (orderId, newStatus) => {
    const orders = MockService.getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = newStatus;
      saveToStorage("cafe_orders", orders);
    }
  },

  // --- INVENTORY COMPOSITE & COMMAND PATTERN WITH UNDO ---
  getInventoryTree: () => loadFromStorage("cafe_inventory", defaultInventory),
  
  saveInventoryTree: (inv) => saveToStorage("cafe_inventory", inv),

  getInventoryHistory: () => loadFromStorage("cafe_inventory_history", defaultInventoryHistory),

  executeInventoryCommand: (actionType, itemId, quantity, performedBy = "Quản lý") => {
    // 📦 Inventory Command Implementation
    const inventory = MockService.getInventoryTree();
    const history = MockService.getInventoryHistory();

    let targetItem = null;
    let beforeQty = 0;
    let afterQty = 0;

    const findAndModify = (nodes) => {
      for (let n of nodes) {
        if (n.componentType === "ITEM" && n.id === itemId) {
          targetItem = n;
          beforeQty = n.quantity;
          if (actionType === "IMPORT") {
            n.quantity += Number(quantity);
          } else if (actionType === "EXPORT") {
            n.quantity = Math.max(0, n.quantity - Number(quantity));
          }
          afterQty = n.quantity;
          return true;
        }
        if (n.children && findAndModify(n.children)) return true;
      }
      return false;
    };

    findAndModify(inventory);

    if (targetItem) {
      // Create Command History Entry (for Undo stack)
      const commandLog = {
        id: Date.now(),
        itemId: itemId,
        itemName: targetItem.name,
        actionType: actionType, // IMPORT, EXPORT
        quantityChanged: Number(quantity),
        quantityBefore: beforeQty,
        quantityAfter: afterQty,
        performedBy: performedBy,
        undone: false,
        timestamp: new Date().toISOString()
      };

      history.unshift(commandLog); // Add to top of history
      MockService.saveInventoryTree(inventory);
      saveToStorage("cafe_inventory_history", history);
      return commandLog;
    }
    throw new Error("Inventory Item not found!");
  },

  undoLastInventoryCommand: () => {
    // ⏪ Command Undo Logic
    const history = MockService.getInventoryHistory();
    const activeCommand = history.find(c => !c.undone);

    if (!activeCommand) {
      throw new Error("Không có thao tác nào để hoàn tác!");
    }

    const inventory = MockService.getInventoryTree();

    const findAndRevert = (nodes) => {
      for (let n of nodes) {
        if (n.componentType === "ITEM" && n.id === activeCommand.itemId) {
          // REVERT: If it was imported, subtract. If it was exported, add back.
          if (activeCommand.actionType === "IMPORT") {
            n.quantity = Math.max(0, n.quantity - activeCommand.quantityChanged);
          } else if (activeCommand.actionType === "EXPORT") {
            n.quantity += activeCommand.quantityChanged;
          }
          activeCommand.undone = true;
          return true;
        }
        if (n.children && findAndRevert(n.children)) return true;
      }
      return false;
    };

    findAndRevert(inventory);

    MockService.saveInventoryTree(inventory);
    saveToStorage("cafe_inventory_history", history);
    return activeCommand;
  },

  // --- ADAPTER PATTERN (PAYMENT INTERFACES) ---
  getPayments: () => loadFromStorage("cafe_payments", defaultPayments),

  processPayment: (orderId, method, amount) => {
    // 💳 Payment Adapter Simulation
    // Adapts MOMO, VNPAY, and BANK_CARD SDKs to standard PaymentGateway interface
    let isSuccess = true;
    let transactionId = "";
    
    switch(method) {
      case "MOMO":
        // Simulated MomoSDK: Phone wallet payment
        transactionId = `MOMO_TXN_${Math.floor(Math.random() * 100000000)}`;
        break;
      case "VNPAY":
        // Simulated VNPaySDK: URL/QR payment
        transactionId = `VNPAY_QR_${Math.floor(Math.random() * 99999999)}`;
        break;
      case "BANK_CARD":
        // Simulated BankCardSDK: Visa/Mastercard swipe
        transactionId = `BANK_VISA_${Math.floor(Math.random() * 999999)}`;
        break;
      default:
        isSuccess = false;
        transactionId = "FAILED_GATEWAY";
    }

    if (isSuccess) {
      const payments = MockService.getPayments();
      const paymentLog = {
        id: Date.now(),
        orderId: orderId,
        method: method, // MOMO, VNPAY, BANK_CARD
        amount: amount,
        status: "SUCCESS",
        transactionId: transactionId,
        timestamp: new Date().toISOString()
      };

      payments.unshift(paymentLog);
      saveToStorage("cafe_payments", payments);

      // Update Order Status to DONE/PAID
      MockService.updateOrderStatus(orderId, "DONE");
      return paymentLog;
    }
    throw new Error("Thanh toán thất bại qua cổng đối tác!");
  },

  // --- PROTOTYPE PATTERN: RECEIPT CLONING ---
  generateReceipt: (paymentId) => {
    const payments = MockService.getPayments();
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) throw new Error("Thanh toán không tồn tại!");

    const orders = MockService.getOrders();
    const order = orders.find(o => o.id === payment.orderId);

    // E-Receipt Prototype: Template is deeply copied and filled out
    const receiptTemplate = {
      receiptNumber: `E-REC-${Math.floor(Math.random() * 1000000)}`,
      header: "☕ COFFEE CORNER & BISTRO ☕",
      address: "144 Xuân Thủy, Cầu Giấy, Hà Nội",
      phone: "0987.654.321",
      clonedFromPrototype: "DEFAULT_RECEIPT_V1",
      footer: "Cảm ơn Quý khách! Hẹn gặp lại!"
    };

    // Deep clone + Populate dynamic properties (PROTOTYPE PATTERN)
    return {
      ...receiptTemplate,
      id: Date.now(),
      orderId: payment.orderId,
      customerName: order ? order.customerName : "Khách hàng",
      method: payment.method,
      transactionId: payment.transactionId,
      items: order ? order.items : [],
      amountPaid: payment.amount,
      timestamp: payment.timestamp
    };
  }
};
