package com.coffeeshop.pattern.singleton;

/**
 * Singleton manager for inventory operations (thread-safe).
 */
public class InventoryManagerSingleton {
    private static volatile InventoryManagerSingleton instance;

    private InventoryManagerSingleton() {}

    public static InventoryManagerSingleton getInstance() {
        if (instance == null) {
            synchronized (InventoryManagerSingleton.class) {
                if (instance == null) {
                    instance = new InventoryManagerSingleton();
                }
            }
        }
        return instance;
    }

    // Example inventory operation methods to be expanded in integration step
    public void logAction(String action) {
        System.out.println("Inventory Action: " + action);
    }
}
