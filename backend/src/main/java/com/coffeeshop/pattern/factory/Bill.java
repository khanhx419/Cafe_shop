package com.coffeeshop.pattern.factory;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Lớp trừu tượng đại diện cho hóa đơn.
 * Sử dụng Factory Method Pattern để tạo các loại hóa đơn khác nhau.
 */
public abstract class Bill {

    private Long orderId;
    private String customerName;
    private double subtotal;
    private double taxAmount;
    private double total;
    private LocalDateTime createdAt;

    /**
     * Constructor mặc định.
     */
    public Bill() {
        this.createdAt = LocalDateTime.now();
    }

    /**
     * Constructor với thông tin cơ bản.
     *
     * @param orderId      mã đơn hàng
     * @param customerName tên khách hàng
     * @param subtotal     tổng tiền trước thuế
     */
    public Bill(Long orderId, String customerName, double subtotal) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.subtotal = subtotal;
        this.createdAt = LocalDateTime.now();
    }

    /**
     * Tạo nội dung hóa đơn.
     *
     * @return chuỗi nội dung hóa đơn đã được format
     */
    public abstract String generateBill();

    /**
     * Lấy loại hóa đơn.
     *
     * @return loại hóa đơn (STANDARD hoặc VAT)
     */
    public abstract String getBillType();

    /**
     * Format ngày giờ cho hóa đơn.
     *
     * @return chuỗi ngày giờ đã format
     */
    protected String getFormattedDateTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return createdAt != null ? createdAt.format(formatter) : "N/A";
    }

    // === Getters & Setters ===

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public double getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(double taxAmount) {
        this.taxAmount = taxAmount;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
