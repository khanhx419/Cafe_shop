package com.coffeeshop.pattern.command;

/**
 * Command interface for inventory actions like import/export.
 */
public interface InventoryCommand {
    void execute();
    void undo();
    String getActionType();
    String getItemName();
    int getQuantity();
}
