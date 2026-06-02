package com.coffeeshop.pattern.decorator;

/**
 * Decorator thêm mức ưu tiên VIP cho đơn hàng.
 * Đơn hàng được đánh dấu ưu tiên sẽ hiển thị màu đỏ và có nhãn VIP.
 */
public class PriorityDecorator extends OrderDecorator {

    /**
     * Constructor nhận đơn hàng cần thêm ưu tiên.
     *
     * @param decoratedOrder đơn hàng cần trang trí
     */
    public PriorityDecorator(IOrder decoratedOrder) {
        super(decoratedOrder);
    }

    /**
     * Đơn hàng ưu tiên luôn trả về true.
     *
     * @return true
     */
    @Override
    public boolean isPriority() {
        return true;
    }

    /**
     * Màu hiển thị đỏ cho đơn hàng ưu tiên.
     *
     * @return "#FF0000"
     */
    @Override
    public String getDisplayColor() {
        return "#FF0000";
    }

    /**
     * Chi tiết đơn hàng kèm nhãn VIP ưu tiên.
     *
     * @return chuỗi chi tiết đơn hàng có nhãn VIP
     */
    @Override
    public String getOrderDetails() {
        return "⚡ [VIP ƯU TIÊN] " + decoratedOrder.getOrderDetails();
    }
}
