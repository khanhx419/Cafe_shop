package com.coffeeshop.pattern.decorator;

/**
 * Decorator thêm topping Thạch vào đồ uống.
 * Giá thêm: 5,000 VND.
 */
public class JellyToppingDecorator extends ToppingDecorator {

    /**
     * Constructor nhận đồ uống cần thêm thạch.
     *
     * @param decoratedBeverage đồ uống cần thêm topping
     */
    public JellyToppingDecorator(IBeverage decoratedBeverage) {
        super(decoratedBeverage);
    }

    /**
     * Lấy mô tả đồ uống kèm topping thạch.
     *
     * @return mô tả đồ uống + thạch
     */
    @Override
    public String getDescription() {
        return decoratedBeverage.getDescription() + " + Thạch";
    }

    /**
     * Lấy tổng chi phí bao gồm phí thạch.
     *
     * @return tổng chi phí (VND)
     */
    @Override
    public double getCost() {
        return decoratedBeverage.getCost() + 5000;
    }
}
