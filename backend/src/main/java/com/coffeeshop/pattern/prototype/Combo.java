package com.coffeeshop.pattern.prototype;

import java.util.ArrayList;
import java.util.List;

/**
 * Lớp Combo triển khai Prototype Pattern.
 * Cho phép nhân bản combo mẫu để tạo combo mới mà không cần tạo lại từ đầu.
 */
public class Combo implements ComboPrototype {

    private String name;
    private List<String> items;
    private double originalPrice;
    private double discountPercent;

    /**
     * Constructor mặc định.
     */
    public Combo() {
        this.items = new ArrayList<>();
    }

    /**
     * Constructor đầy đủ thông tin.
     *
     * @param name            tên combo
     * @param items           danh sách các món trong combo
     * @param originalPrice   giá gốc (VND)
     * @param discountPercent phần trăm giảm giá
     */
    public Combo(String name, List<String> items, double originalPrice, double discountPercent) {
        this.name = name;
        this.items = new ArrayList<>(items);
        this.originalPrice = originalPrice;
        this.discountPercent = discountPercent;
    }

    /**
     * Nhân bản sâu (deep copy) đối tượng Combo.
     * Tạo bản sao mới với danh sách items riêng biệt.
     *
     * @return bản sao của combo
     */
    @Override
    public ComboPrototype clone() {
        return new Combo(this.name, new ArrayList<>(this.items),
                this.originalPrice, this.discountPercent);
    }

    /**
     * Lấy tên combo.
     *
     * @return tên combo
     */
    @Override
    public String getComboName() {
        return name;
    }

    /**
     * Tính giá combo sau khi áp dụng giảm giá.
     *
     * @return giá combo đã giảm (VND)
     */
    @Override
    public double getComboPrice() {
        return originalPrice * (1 - discountPercent / 100);
    }

    // === Getters & Setters ===

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = new ArrayList<>(items);
    }

    public double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(double discountPercent) {
        this.discountPercent = discountPercent;
    }

    @Override
    public String toString() {
        return String.format("Combo{name='%s', items=%s, giá gốc=%.0f, giảm=%.0f%%, giá sau giảm=%.0f}",
                name, items, originalPrice, discountPercent, getComboPrice());
    }
}
