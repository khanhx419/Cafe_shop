package com.coffeeshop.pattern.decorator;

import java.util.ArrayList;
import java.util.List;

/**
 * Đơn hàng tiêu chuẩn - Concrete Component trong Order Decorator Pattern.
 * Đại diện cho một đơn hàng bình thường không có ưu tiên.
 */
public class StandardOrder implements IOrder {

    private Long orderId;
    private String customerName;
    private List<String> items;
    private double totalPrice;

    /**
     * Constructor tạo đơn hàng tiêu chuẩn.
     *
     * @param orderId      mã đơn hàng
     * @param customerName tên khách hàng
     * @param items        danh sách các món
     * @param totalPrice   tổng giá (VND)
     */
    public StandardOrder(Long orderId, String customerName, List<String> items, double totalPrice) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.items = new ArrayList<>(items);
        this.totalPrice = totalPrice;
    }

    /**
     * Lấy mã đơn hàng.
     *
     * @return mã đơn hàng
     */
    @Override
    public Long getOrderId() {
        return orderId;
    }

    /**
     * Lấy chi tiết đơn hàng.
     *
     * @return chuỗi chi tiết đơn hàng
     */
    @Override
    public String getOrderDetails() {
        return String.format("Đơn hàng #%d - Khách: %s - Món: %s - Tổng: %,.0f VND",
                orderId, customerName, String.join(", ", items), totalPrice);
    }

    /**
     * Đơn hàng tiêu chuẩn không có ưu tiên.
     *
     * @return false
     */
    @Override
    public boolean isPriority() {
        return false;
    }

    /**
     * Màu hiển thị mặc định (trắng).
     *
     * @return "#FFFFFF"
     */
    @Override
    public String getDisplayColor() {
        return "#FFFFFF";
    }

    // === Getters ===

    public String getCustomerName() {
        return customerName;
    }

    public List<String> getItems() {
        return items;
    }

    public double getTotalPrice() {
        return totalPrice;
    }
}
