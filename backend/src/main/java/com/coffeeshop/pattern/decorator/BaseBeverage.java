package com.coffeeshop.pattern.decorator;

/**
 * Đồ uống cơ bản - Concrete Component trong Decorator Pattern.
 * Đại diện cho một đồ uống chưa thêm topping.
 */
public class BaseBeverage implements IBeverage {

    private String name;
    private double baseCost;

    /**
     * Constructor tạo đồ uống cơ bản.
     *
     * @param name     tên đồ uống
     * @param baseCost giá cơ bản (VND)
     */
    public BaseBeverage(String name, double baseCost) {
        this.name = name;
        this.baseCost = baseCost;
    }

    /**
     * Lấy mô tả đồ uống cơ bản.
     *
     * @return tên đồ uống
     */
    @Override
    public String getDescription() {
        return name;
    }

    /**
     * Lấy giá đồ uống cơ bản.
     *
     * @return giá cơ bản (VND)
     */
    @Override
    public double getCost() {
        return baseCost;
    }
}
