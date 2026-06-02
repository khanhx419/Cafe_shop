package com.coffeeshop.pattern.command;

/**
 * Concrete Command for canceling an order.
 */
public class CancelOrderCommand implements ICommand {
    private Barista barista;
    private String orderDetails;
    private boolean executed;

    public CancelOrderCommand(Barista barista, String orderDetails) {
        this.barista = barista;
        this.orderDetails = orderDetails;
        this.executed = false;
    }

    @Override
    public void execute() {
        // Execute the order cancellation
        barista.cancelOrder(orderDetails);
        executed = true;
    }

    @Override
    public void undo() {
        if (executed) {
            barista.prepareOrder(orderDetails);
            executed = false;
        }
    }

    @Override
    public String getDescription() {
        return "Cancel order: " + orderDetails;
    }
}
