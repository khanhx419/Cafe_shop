package com.coffeeshop.pattern.command;

import java.util.ArrayList;
import java.util.List;

/**
 * Invoker class for executing and tracking inventory commands, supporting undo.
 */
public class InventoryInvoker {
    private List<InventoryCommand> history = new ArrayList<>();

    public void executeCommand(InventoryCommand command) {
        command.execute();
        history.add(command);
    }

    public InventoryCommand undoLast() {
        if (!history.isEmpty()) {
            InventoryCommand cmd = history.remove(history.size() - 1);
            cmd.undo();
            return cmd;
        }
        return null;
    }

    public List<InventoryCommand> getHistory() {
        return history;
    }
}
