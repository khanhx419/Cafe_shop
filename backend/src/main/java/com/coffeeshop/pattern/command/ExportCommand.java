package com.coffeeshop.pattern.command;

/**
 * Concrete command for inventory export action.
 */
public class ExportCommand implements InventoryCommand {
    private String itemName;
    private int quantity;
    private Runnable exportAction;
    private Runnable undoAction;

    public ExportCommand(String itemName, int quantity, Runnable exportAction, Runnable undoAction) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.exportAction = exportAction;
        this.undoAction = undoAction;
    }

    @Override
    public void execute() {
        exportAction.run();
    }

    @Override
    public void undo() {
        undoAction.run();
    }

    @Override
    public String getActionType() {
        return "EXPORT";
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
