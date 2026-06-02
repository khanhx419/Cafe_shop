package com.coffeeshop.pattern.command;

/**
 * Concrete Command for placing an order.
 */
public class PlaceOrderCommand implements ICommand {
    private Barista barista;
    private String orderDetails;
    private boolean executed;

    public PlaceOrderCommand(Barista barista, String orderDetails) {
        this.barista = barista;
        this.orderDetails = orderDetails;
        this.executed = false;
    }

    @Override
    public void execute() {
        // Execute the actual order preparation
        barista.prepareOrder(orderDetails);
        executed = true;
    }

    @Override
    public void undo() {
        if (executed) {
            barista.cancelOrder(orderDetails);
            executed = false;
        }
    }

    @Override
    public String getDescription() {
        return "Place order: " + orderDetails;
    }
}
