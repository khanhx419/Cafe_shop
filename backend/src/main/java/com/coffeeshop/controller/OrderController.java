package com.coffeeshop.controller;

import com.coffeeshop.entity.Drink;
import com.coffeeshop.entity.Order;
import com.coffeeshop.entity.OrderItem;
import com.coffeeshop.repository.DrinkRepository;
import com.coffeeshop.repository.OrderRepository;
import com.coffeeshop.dto.OrderRequestDTO;
import com.coffeeshop.dto.OrderItemRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DrinkRepository drinkRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public Order createOrder(@RequestBody OrderRequestDTO request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setStatus("PENDING");
        order.setCreatedAt(new Date());
        order.setPriority(request.isPriority());
        order.setTotalPrice(request.getTotalPrice());
        
        List<OrderItem> orderItems = new ArrayList<>();
        if (request.getItems() != null) {
            for (OrderItemRequestDTO itemDto : request.getItems()) {
                Drink drink = drinkRepository.findById(itemDto.getMenuItem().getId()).orElse(null);
                if (drink != null) {
                    OrderItem orderItem = new OrderItem(drink, order, itemDto.getQuantity());
                    orderItems.add(orderItem);
                }
            }
        }
        order.setItems(orderItems);
        return orderRepository.save(order);
    }

    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @PutMapping("/{id}/priority")
    public Order updatePriority(@PathVariable Long id, @RequestParam boolean isPriority) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setPriority(isPriority);
        if (isPriority && !order.getCustomerName().startsWith("⚡ [VIP ƯU TIÊN]")) {
            order.setCustomerName("⚡ [VIP ƯU TIÊN] " + order.getCustomerName());
        } else if (!isPriority && order.getCustomerName().startsWith("⚡ [VIP ƯU TIÊN]")) {
            order.setCustomerName(order.getCustomerName().replace("⚡ [VIP ƯU TIÊN] ", ""));
        }
        return orderRepository.save(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }
}
