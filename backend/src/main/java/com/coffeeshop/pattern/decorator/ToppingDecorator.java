package com.coffeeshop.pattern.decorator;

/**
 * Lớp trừu tượng Decorator cho topping đồ uống.
 * Bọc (wrap) một IBeverage và thêm chức năng mới.
 */
public abstract class ToppingDecorator implements IBeverage {

    /**
     * Đồ uống được trang trí (bọc bên trong).
     */
    protected IBeverage decoratedBeverage;

    /**
     * Constructor nhận đồ uống cần trang trí.
     *
     * @param decoratedBeverage đồ uống cần thêm topping
     */
    public ToppingDecorator(IBeverage decoratedBeverage) {
        this.decoratedBeverage = decoratedBeverage;
    }
}
