package com.coffeeshop.dto;

public class PaymentRequestDTO {
    private Long orderId;
    private String method;
    private int amount;

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }
}
