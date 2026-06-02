package com.coffeeshop.pattern.decorator;

/**
 * Interface đại diện cho một đơn hàng trong hệ thống Decorator.
 * Là thành phần cơ bản (Component) cho Order Decorator Pattern.
 */
public interface IOrder {

    /**
     * Lấy mã đơn hàng.
     *
     * @return mã đơn hàng
     */
    Long getOrderId();

    /**
     * Lấy chi tiết đơn hàng.
     *
     * @return chuỗi mô tả chi tiết đơn hàng
     */
    String getOrderDetails();

    /**
     * Kiểm tra đơn hàng có ưu tiên không.
     *
     * @return true nếu là đơn hàng ưu tiên
     */
    boolean isPriority();

    /**
     * Lấy màu hiển thị của đơn hàng.
     *
     * @return mã màu hex
     */
    String getDisplayColor();
}
