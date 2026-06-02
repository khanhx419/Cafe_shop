package com.coffeeshop.pattern.command;

/**
 * General command interface for ordering operations.
 * Allows execution and undo of actions.
 */
public interface ICommand {
    void execute();
    void undo();
    String getDescription();
}
