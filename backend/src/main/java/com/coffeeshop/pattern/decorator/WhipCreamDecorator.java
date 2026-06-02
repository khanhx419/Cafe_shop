package com.coffeeshop.pattern.decorator;

/**
 * Decorator thêm topping Kem tươi vào đồ uống.
 * Giá thêm: 7,000 VND.
 */
public class WhipCreamDecorator extends ToppingDecorator {

    /**
     * Constructor nhận đồ uống cần thêm kem tươi.
     *
     * @param decoratedBeverage đồ uống cần thêm topping
     */
    public WhipCreamDecorator(IBeverage decoratedBeverage) {
        super(decoratedBeverage);
    }

    /**
     * Lấy mô tả đồ uống kèm topping kem tươi.
     *
     * @return mô tả đồ uống + kem tươi
     */
    @Override
    public String getDescription() {
        return decoratedBeverage.getDescription() + " + Kem tươi";
    }

    /**
     * Lấy tổng chi phí bao gồm phí kem tươi.
     *
     * @return tổng chi phí (VND)
     */
    @Override
    public double getCost() {
        return decoratedBeverage.getCost() + 7000;
    }
}
