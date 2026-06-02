package com.coffeeshop.pattern.singleton;

/**
 * Singleton manager for receipt printing (thread-safe).
 */
public class PrinterManager {
    private static volatile PrinterManager instance;

    private PrinterManager() {}

    public static PrinterManager getInstance() {
        if (instance == null) {
            synchronized (PrinterManager.class) {
                if (instance == null) {
                    instance = new PrinterManager();
                }
            }
        }
        return instance;
    }

    // Simulate printing a receipt
    public void printReceipt(String content) {
        System.out.println("=== HÓA ĐƠN ===\n" + content + "\n===============");
    }
}
