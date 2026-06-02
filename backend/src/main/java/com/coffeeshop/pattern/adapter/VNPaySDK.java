package com.coffeeshop.pattern.adapter;

/**
 * Third-party VNPay SDK.
 */
public class VNPaySDK {
    public boolean vnPayCheckout(double amount, String vnp_TxnRef) {
        System.out.println("Thanh toán VNPay: " + amount + " VND cho mã: " + vnp_TxnRef);
        return true;
    }
}
