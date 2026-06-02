package com.coffeeshop.pattern.adapter;

/**
 * Adapter between MomoSDK and PaymentGateway
 */
public class MomoAdapter implements PaymentGateway {
    private MomoSDK momoSDK;

    public MomoAdapter(MomoSDK momoSDK) {
        this.momoSDK = momoSDK;
    }

    @Override
    public boolean processPayment(double amount, String currency, String orderId) {
        // Momo only supports VND for this demo.
        if (!"VND".equals(currency)) {
            System.out.println("Momo chỉ hỗ trợ VND");
            return false;
        }
        return momoSDK.payWithMomo(amount, orderId);
    }
}
