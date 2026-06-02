package com.coffeeshop.pattern.adapter;

/**
 * Adapter to unify ShopeeFoodData to InternalPricing.
 */
public class ShopeeFoodAdapter implements InternalPricing {
    private ShopeeFoodData shopeeData;

    public ShopeeFoodAdapter(ShopeeFoodData shopeeData) {
        this.shopeeData = shopeeData;
    }

    @Override
    public String getItemName() {
        return shopeeData.getProductTitle();
    }

    @Override
    public double getPrice() {
        return shopeeData.getShopeePriceInCents() / 100.0;
    }

    @Override
    public String getCurrency() {
        return "VND";
    }
}
