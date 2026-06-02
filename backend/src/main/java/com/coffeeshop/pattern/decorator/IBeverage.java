package com.coffeeshop.pattern.decorator;

/**
 * Interface đại diện cho một đồ uống trong hệ thống Decorator.
 * Là thành phần cơ bản (Component) trong Decorator Pattern.
 */
public interface IBeverage {

    /**
     * Lấy mô tả đồ uống (bao gồm các topping đã thêm).
     *
     * @return chuỗi mô tả đồ uống
     */
    String getDescription();

    /**
     * Lấy tổng chi phí đồ uống (bao gồm giá topping).
     *
     * @return tổng chi phí (VND)
     */
    double getCost();
}
