package com.coffeeshop.pattern.adapter;

/**
 * Data format from ShopeeFood API.
 */
public class ShopeeFoodData {
    private String productTitle;
    private int shopeePriceInCents;
    private String region;

    public ShopeeFoodData(String productTitle, int shopeePriceInCents, String region) {
        this.productTitle = productTitle;
        this.shopeePriceInCents = shopeePriceInCents;
        this.region = region;
    }

    public String getProductTitle() { return productTitle; }
    public int getShopeePriceInCents() { return shopeePriceInCents; }
    public String getRegion() { return region; }
}
