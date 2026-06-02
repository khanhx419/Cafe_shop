package com.coffeeshop.pattern.adapter;

/**
 * Bank Card SDK stub.
 */
public class BankCardSDK {
    public boolean makeCardPayment(double total, String transactionId) {
        System.out.println("Thanh toán thẻ: " + total + " VND (TxId: " + transactionId + ")");
        return true;
    }
}
