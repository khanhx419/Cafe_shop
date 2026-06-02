package com.coffeeshop.pattern.adapter;

/**
 * Target interface for internal unified pricing.
 */
public interface InternalPricing {
    String getItemName();
    double getPrice();
    String getCurrency();
}
