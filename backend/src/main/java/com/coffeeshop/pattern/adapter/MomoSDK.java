package com.coffeeshop.pattern.adapter;

/**
 * Third-party Momo payment SDK.
 */
public class MomoSDK {
    public boolean payWithMomo(double amountVND, String orderRef) {
        System.out.println("Thanh toán Momo: " + amountVND + " VND cho đơn: " + orderRef);
        return true;
    }
}
