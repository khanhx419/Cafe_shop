package com.coffeeshop.pattern.prototype;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Biên lai điện tử triển khai Prototype Pattern.
 * Có thể nhân bản để tạo biên lai mới với cấu trúc giống nhau.
 */
public class EReceipt implements ReceiptPrototype {

    private String storeName;
    private String customerName;
    private List<String> items;
    private double totalAmount;
    private LocalDateTime dateTime;
    private String paymentMethod;

    /**
     * Constructor mặc định.
     */
    public EReceipt() {
        this.items = new ArrayList<>();
        this.dateTime = LocalDateTime.now();
    }

    /**
     * Constructor đầy đủ thông tin.
     *
     * @param storeName     tên cửa hàng
     * @param customerName  tên khách hàng
     * @param items         danh sách các món đã mua
     * @param totalAmount   tổng tiền (VND)
     * @param dateTime      thời gian giao dịch
     * @param paymentMethod phương thức thanh toán
     */
    public EReceipt(String storeName, String customerName, List<String> items,
                    double totalAmount, LocalDateTime dateTime, String paymentMethod) {
        this.storeName = storeName;
        this.customerName = customerName;
        this.items = new ArrayList<>(items);
        this.totalAmount = totalAmount;
        this.dateTime = dateTime;
        this.paymentMethod = paymentMethod;
    }

    /**
     * Nhân bản sâu (deep copy) biên lai.
     * Tạo bản sao mới với danh sách items riêng biệt.
     *
     * @return bản sao của biên lai
     */
    @Override
    public ReceiptPrototype clone() {
        return new EReceipt(
                this.storeName,
                this.customerName,
                new ArrayList<>(this.items),
                this.totalAmount,
                this.dateTime,
                this.paymentMethod
        );
    }

    /**
     * Điền thông tin chi tiết cho biên lai.
     *
     * @param customerName  tên khách hàng
     * @param totalAmount   tổng tiền (VND)
     * @param paymentMethod phương thức thanh toán
     * @param dateTime      thời gian giao dịch
     */
    public void fillDetails(String customerName, double totalAmount,
                            String paymentMethod, LocalDateTime dateTime) {
        this.customerName = customerName;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
        this.dateTime = dateTime;
    }

    // === Getters & Setters ===

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = new ArrayList<>(items);
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    @Override
    public String toString() {
        return String.format("EReceipt{cửa hàng='%s', khách='%s', tổng=%.0f VND, thanh toán='%s'}",
                storeName, customerName, totalAmount, paymentMethod);
    }
}
