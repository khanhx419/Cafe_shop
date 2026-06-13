package com.coffeeshop.controller;

import com.coffeeshop.entity.Order;
import com.coffeeshop.entity.PaymentLog;
import com.coffeeshop.repository.OrderRepository;
import com.coffeeshop.repository.PaymentLogRepository;
import com.coffeeshop.dto.PaymentRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentLogRepository paymentLogRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<PaymentLog> getAllPayments() {
        return paymentLogRepository.findAll();
    }

    @PostMapping
    public PaymentLog processPayment(@RequestBody PaymentRequestDTO request) {
        // Find order
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Create Payment Log
        PaymentLog payment = new PaymentLog();
        payment.setOrderId(order.getId());
        payment.setMethod(request.getMethod());
        payment.setAmount(request.getAmount());
        payment.setStatus("COMPLETED");
        payment.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        payment.setTimestamp(new Date());

        // Update Order status
        order.setStatus("DONE");
        orderRepository.save(order);

        return paymentLogRepository.save(payment);
    }
}
