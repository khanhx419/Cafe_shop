package com.coffeeshop.pattern.adapter;

/**
 * Adapter to unify GrabFoodData to InternalPricing.
 */
public class GrabFoodAdapter implements InternalPricing {
    private GrabFoodData grabData;

    public GrabFoodAdapter(GrabFoodData grabData) {
        this.grabData = grabData;
    }

    @Override
    public String getItemName() {
        return grabData.getFoodName();
    }

    @Override
    public double getPrice() {
        return grabData.getGrabPrice();
    }

    @Override
    public String getCurrency() {
        return grabData.getGrabCurrency();
    }
}
