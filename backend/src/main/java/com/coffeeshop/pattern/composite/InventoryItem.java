package com.coffeeshop.pattern.composite;

/**
 * Leaf node: an actual inventory item (product, ingredient).
 */
public class InventoryItem extends InventoryComponent {
    private int quantity;

    public InventoryItem(String name, String unit, int quantity) {
        super(name, unit);
        this.quantity = quantity;
    }

    @Override
    public int kiemTraSoLuong() {
        return quantity;
    }

    @Override
    public void display(String indent) {
        System.out.printf("%s%s — SL: %d %s\n", indent, name, quantity, unit);
    }
}
