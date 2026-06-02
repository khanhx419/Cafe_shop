package com.coffeeshop.pattern.command;

/**
 * Receiver class in Command pattern, responsible for performing actual order operations.
 */
public class Barista {
    private String name;

    public Barista(String name) {
        this.name = name;
    }

    public String prepareOrder(String orderDetails) {
        // Business logic to prepare an order (actual implementation may interact with DB/services)
        return "Barista " + name + " prepared: " + orderDetails;
    }

    public String cancelOrder(String orderDetails) {
        // Business logic to cancel an order (actual implementation may update status/revert db changes)
        return "Barista " + name + " cancelled: " + orderDetails;
    }
}
