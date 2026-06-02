package com.coffeeshop.pattern.decorator;

/**
 * Decorator thêm topping Trân châu vào đồ uống.
 * Giá thêm: 5,000 VND.
 */
public class BobaToppingDecorator extends ToppingDecorator {

    /**
     * Constructor nhận đồ uống cần thêm trân châu.
     *
     * @param decoratedBeverage đồ uống cần thêm topping
     */
    public BobaToppingDecorator(IBeverage decoratedBeverage) {
        super(decoratedBeverage);
    }

    /**
     * Lấy mô tả đồ uống kèm topping trân châu.
     *
     * @return mô tả đồ uống + trân châu
     */
    @Override
    public String getDescription() {
        return decoratedBeverage.getDescription() + " + Trân châu";
    }

    /**
     * Lấy tổng chi phí bao gồm phí trân châu.
     *
     * @return tổng chi phí (VND)
     */
    @Override
    public double getCost() {
        return decoratedBeverage.getCost() + 5000;
    }
}
