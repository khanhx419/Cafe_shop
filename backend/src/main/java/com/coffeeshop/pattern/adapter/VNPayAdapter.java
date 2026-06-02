package com.coffeeshop.pattern.adapter;

/**
 * Adapter between VNPaySDK and PaymentGateway
 */
public class VNPayAdapter implements PaymentGateway {
    private VNPaySDK vnpay;

    public VNPayAdapter(VNPaySDK vnpay) {
        this.vnpay = vnpay;
    }

    @Override
    public boolean processPayment(double amount, String currency, String orderId) {
        // VNPay only supports VND for this demo.
        if (!"VND".equals(currency)) {
            System.out.println("VNPay chỉ hỗ trợ VND");
            return false;
        }
        return vnpay.vnPayCheckout(amount, orderId);
    }
}
