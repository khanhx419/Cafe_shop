package com.coffeeshop.pattern.adapter;

/**
 * Data format from GrabFood API.
 */
public class GrabFoodData {
    private String foodName;
    private double grabPrice;
    private String grabCurrency;

    public GrabFoodData(String foodName, double grabPrice, String grabCurrency) {
        this.foodName = foodName;
        this.grabPrice = grabPrice;
        this.grabCurrency = grabCurrency;
    }

    public String getFoodName() { return foodName; }
    public double getGrabPrice() { return grabPrice; }
    public String getGrabCurrency() { return grabCurrency; }
}
