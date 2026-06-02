package com.coffeeshop.pattern.decorator;

/**
 * Lớp trừu tượng Decorator cho đơn hàng.
 * Bọc (wrap) một IOrder và thêm chức năng mới.
 */
public abstract class OrderDecorator implements IOrder {

    /**
     * Đơn hàng được trang trí (bọc bên trong).
     */
    protected IOrder decoratedOrder;

    /**
     * Constructor nhận đơn hàng cần trang trí.
     *
     * @param decoratedOrder đơn hàng cần trang trí
     */
    public OrderDecorator(IOrder decoratedOrder) {
        this.decoratedOrder = decoratedOrder;
    }

    @Override
    public Long getOrderId() {
        return decoratedOrder.getOrderId();
    }

    @Override
    public String getOrderDetails() {
        return decoratedOrder.getOrderDetails();
    }

    @Override
    public boolean isPriority() {
        return decoratedOrder.isPriority();
    }

    @Override
    public String getDisplayColor() {
        return decoratedOrder.getDisplayColor();
    }
}
