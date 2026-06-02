package com.coffeeshop.pattern.adapter;

/**
 * Target interface for payment processing.
 */
public interface PaymentGateway {
    boolean processPayment(double amount, String currency, String orderId);
}
