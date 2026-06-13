import axios from 'axios';
import { MockService } from './mockData';

const BASE_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000, // 2 seconds timeout to quickly fallback to mock if backend is down
});

export const ApiService = {
  getMenuTree: async () => {
    try {
      const response = await axiosInstance.get('/drinks');
      const drinks = response.data;
      
      // Transform flat DB drinks into frontend composite tree
      const menuTree = [
        { id: 1, name: "Đồ uống", componentType: "CATEGORY", children: [] },
      ];
      
      drinks.forEach(d => {
        menuTree[0].children.push({
          id: d.id,
          name: d.name,
          componentType: "ITEM",
          price: d.price,
          beverageType: d.type,
          description: d.description
        });
      });
      
      return menuTree;
    } catch (error) {
      console.warn("Backend offline or error, falling back to mockData for getMenuTree");
      return MockService.getMenuTree();
    }
  },

  addMenuItem: async (parentId, itemData) => {
    try {
      const newDrink = {
        name: itemData.name,
        price: itemData.price,
        description: itemData.description || "",
        type: itemData.beverageType || "COFFEE"
      };
      const response = await axiosInstance.post('/drinks', newDrink);
      
      // Transform response back to frontend format
      return {
        id: response.data.id,
        name: response.data.name,
        componentType: "ITEM",
        price: response.data.price,
        beverageType: response.data.type,
        description: response.data.description
      };
    } catch (error) {
      console.warn("Backend offline, falling back to mockData for addMenuItem");
      return MockService.addMenuItem(parentId, itemData);
    }
  },

  deleteMenuItem: async (itemId) => {
    try {
      await axiosInstance.delete(`/drinks/${itemId}`);
    } catch (error) {
      console.warn("Backend offline, falling back to mockData for deleteMenuItem");
      MockService.deleteMenuItem(itemId);
    }
  },

  // Inventory
  getInventoryTree: async () => {
    try {
      const response = await axiosInstance.get('/inventory');
      const items = response.data;
      
      const invTree = [
        { id: 10, name: "Kho Tổng (Backend)", componentType: "CONTAINER", children: [] }
      ];
      
      items.forEach(i => {
        invTree[0].children.push({
          id: i.id,
          name: i.name,
          componentType: "ITEM",
          unit: i.unit,
          quantity: i.quantity
        });
      });
      return invTree;
    } catch (error) {
      console.warn("Backend offline, falling back to mockData for getInventoryTree");
      return MockService.getInventoryTree();
    }
  },

  getInventoryHistory: async () => {
    try {
      const response = await axiosInstance.get('/inventory/history');
      const history = response.data;
      return history.map(h => ({
        ...h,
        itemName: h.inventory ? h.inventory.name : "Vật tư",
      }));
    } catch (error) {
      console.warn("Backend offline, falling back to mockData for getInventoryHistory");
      return MockService.getInventoryHistory();
    }
  },

  executeInventoryCommand: async (actionType, itemId, quantity, performedBy) => {
    try {
      const payload = { actionType, itemId, quantity, performedBy };
      const response = await axiosInstance.post('/inventory/command', payload);
      return {
        ...response.data,
        itemName: response.data.inventory ? response.data.inventory.name : "Vật tư"
      };
    } catch (error) {
      console.warn("Backend offline, falling back to mockData for executeInventoryCommand");
      return MockService.executeInventoryCommand(actionType, itemId, quantity, performedBy);
    }
  },

  undoLastInventoryCommand: async () => {
    try {
      const response = await axiosInstance.post('/inventory/undo');
      return {
        ...response.data,
        itemName: response.data.inventory ? response.data.inventory.name : "Vật tư"
      };
    } catch (error) {
      console.warn("Backend offline, falling back to mockData for undoLastInventoryCommand");
      return MockService.undoLastInventoryCommand();
    }
  },

  // Orders
  getOrders: async () => {
    try {
      const response = await axiosInstance.get('/orders');
      const orders = response.data;
      
      // Map backend Order items (which have 'drink') to frontend items (which expect 'finalDescription')
      return orders.map(order => ({
        ...order,
        items: order.items ? order.items.map(item => ({
          ...item,
          finalDescription: item.drink ? item.drink.name : "Món uống",
          name: item.drink ? item.drink.name : "Món uống",
          price: item.drink ? item.drink.price : 0
        })) : []
      }));
    } catch (error) {
      console.warn("Backend offline, falling back to mockData for getOrders");
      return MockService.getOrders();
    }
  },

  placeOrder: async (orderData) => {
    try {
      // Calculate total price if not provided
      if (!orderData.totalPrice) {
        orderData.totalPrice = orderData.items.reduce((sum, item) => sum + (item.decoratedCost * item.quantity), 0);
      }
      
      const response = await axiosInstance.post('/orders', orderData);
      
      // The backend returns the saved Order. We need to map it back like in getOrders.
      const savedOrder = response.data;
      return {
        ...savedOrder,
        items: savedOrder.items ? savedOrder.items.map(item => ({
          ...item,
          finalDescription: item.drink ? item.drink.name : "Món uống",
          name: item.drink ? item.drink.name : "Món uống",
          price: item.drink ? item.drink.price : 0
        })) : []
      };
    } catch (error) {
      console.warn("Backend offline, falling back to mockData for placeOrder");
      return MockService.placeOrder(orderData);
    }
  },

  updateOrderStatus: async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/orders/${orderId}/status?status=${newStatus}`);
    } catch (error) {
      console.warn("Backend offline, falling back to mockData for updateOrderStatus");
      MockService.updateOrderStatus(orderId, newStatus);
    }
  },
  
  // Other Methods (Toppings, Payments, Combos, etc)
  getToppings: async () => {
    try {
      const response = await axiosInstance.get('/toppings');
      return response.data;
    } catch (e) {
      console.warn("Backend offline, falling back to mockData for getToppings");
      return MockService.getToppings();
    }
  },
  getCombos: async () => {
    try {
      const response = await axiosInstance.get('/combos');
      return response.data;
    } catch (e) {
      console.warn("Backend offline, falling back to mockData for getCombos");
      return MockService.getCombos();
    }
  },
  cloneCombo: async (comboId, customerName) => {
    try {
      const response = await axiosInstance.get('/combos');
      const combos = response.data;
      const targetTemplate = combos.find(c => c.id === comboId);
      if (!targetTemplate) throw new Error("Combo template not found in DB!");

      const clonedCombo = {
        ...targetTemplate,
        id: Date.now(),
        name: `${targetTemplate.name} (Khách: ${customerName})`,
        isTemplate: false,
        clonedFromId: targetTemplate.id,
        createdAt: new Date().toISOString()
      };

      let rawTotal = 0;
      clonedCombo.items.forEach(comboItem => {
        rawTotal += comboItem.price * comboItem.quantity;
      });
      const discountedPrice = rawTotal * (1 - (clonedCombo.discountPercent / 100));
      return { clonedCombo, discountedPrice };
    } catch (e) {
      console.warn("Backend offline, falling back to mockData for cloneCombo");
      return MockService.cloneCombo(comboId, customerName);
    }
  },
  calculateDecoratedCost: async (baseItem, selectedToppingIds) => {
    try {
      // In a real advanced backend, you could calculate this server-side.
      // For this architecture, we keep the Decorator pattern on the client using backend toppings.
      let description = baseItem.name;
      let cost = baseItem.price;
      const response = await axiosInstance.get('/toppings');
      const toppings = response.data;
      
      selectedToppingIds.forEach(id => {
        const topping = toppings.find(t => t.id === id);
        if (topping) {
          cost += topping.price;
          description += ` + ${topping.name}`;
        }
      });
      return { description, cost };
    } catch (e) {
      console.warn("Backend offline, falling back to mockData for calculateDecoratedCost");
      return MockService.calculateDecoratedCost(baseItem, selectedToppingIds);
    }
  },
  cancelOrder: async (orderId) => {
    try {
      await axiosInstance.put(`/orders/${orderId}/status?status=CANCELLED`);
    } catch (e) {
      console.warn("Backend offline, falling back to mockData for cancelOrder");
      return MockService.cancelOrder(orderId);
    }
  },
  deleteOrder: async (orderId) => {
    try {
      await axiosInstance.delete(`/orders/${orderId}`);
    } catch (e) {
      console.warn("Backend offline, mockData logic for deleteOrder");
      const orders = MockService.getOrders();
      const updatedOrders = orders.filter(o => o.id !== orderId);
      localStorage.setItem("cafe_orders", JSON.stringify(updatedOrders));
    }
  },
  getPayments: async () => {
    try {
      const response = await axiosInstance.get('/payments');
      return response.data;
    } catch (e) {
      console.warn("Backend offline, falling back to mockData for getPayments");
      return MockService.getPayments();
    }
  },
  processPayment: async (orderId, method, amount) => {
    try {
      const response = await axiosInstance.post('/payments', { orderId, method, amount });
      return response.data;
    } catch (e) {
      console.warn("Backend offline, falling back to mockData for processPayment");
      return MockService.processPayment(orderId, method, amount);
    }
  },
  generateReceipt: async (paymentId) => {
    try {
      const response = await axiosInstance.get('/payments');
      const payments = response.data;
      const payment = payments.find(p => p.id === paymentId);
      if (!payment) throw new Error("Payment not found in DB!");

      const ordersRes = await axiosInstance.get('/orders');
      const orders = ordersRes.data;
      const order = orders.find(o => o.id === payment.orderId);

      const receiptTemplate = {
        receiptNumber: `E-REC-${Math.floor(Math.random() * 1000000)}`,
        header: "☕ COFFEE CORNER & BISTRO ☕",
        address: "144 Xuân Thủy, Cầu Giấy, Hà Nội",
        phone: "0987.654.321",
        clonedFromPrototype: "DEFAULT_RECEIPT_V1",
        footer: "Cảm ơn Quý khách! Hẹn gặp lại!"
      };

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
    } catch (e) {
      console.warn("Backend offline, falling back to mockData for generateReceipt");
      return MockService.generateReceipt(paymentId);
    }
  },
  setOrderPriority: async (orderId, isPriority) => {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}/priority?isPriority=${isPriority}`);
      return response.data;
    } catch (e) {
      console.warn("Backend offline, falling back to mockData for setOrderPriority");
      return MockService.setOrderPriority(orderId, isPriority);
    }
  }
};
