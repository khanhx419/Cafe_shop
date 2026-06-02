package com.coffeeshop.pattern.adapter;

/**
 * Adapter between BankCardSDK and PaymentGateway
 */
public class BankCardAdapter implements PaymentGateway {
    private BankCardSDK cardSDK;

    public BankCardAdapter(BankCardSDK cardSDK) {
        this.cardSDK = cardSDK;
    }

    @Override
    public boolean processPayment(double amount, String currency, String orderId) {
        // Assume for example's sake BankCard supports VND and USD directly
        return cardSDK.makeCardPayment(amount, orderId);
    }
}
