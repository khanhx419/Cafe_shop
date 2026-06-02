package com.coffeeshop.pattern.command;

/**
 * Concrete command for inventory import action.
 */
public class ImportCommand implements InventoryCommand {
    private String itemName;
    private int quantity;
    private Runnable importAction;
    private Runnable undoAction;

    public ImportCommand(String itemName, int quantity, Runnable importAction, Runnable undoAction) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.importAction = importAction;
        this.undoAction = undoAction;
    }

    @Override
    public void execute() {
        importAction.run();
    }

    @Override
    public void undo() {
        undoAction.run();
    }

    @Override
    public String getActionType() {
        return "IMPORT";
    }

    @Override
    public String getItemName() {
        return itemName;
    }

    @Override
    public int getQuantity() {
        return quantity;
    }
}
