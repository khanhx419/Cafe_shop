package com.coffeeshop.pattern.composite;

import java.util.List;

/**
 * Base/component class for inventory tree, supports composite pattern.
 */
public abstract class InventoryComponent {
    protected String name;
    protected String unit;

    public InventoryComponent(String name, String unit) {
        this.name = name;
        this.unit = unit;
    }

    public String getName() { return name; }
    public String getUnit() { return unit; }

    public abstract int kiemTraSoLuong();
    public abstract void display(String indent);
    public void add(InventoryComponent component) {
        throw new UnsupportedOperationException();
    }
    public void remove(InventoryComponent component) {
        throw new UnsupportedOperationException();
    }
    public List<InventoryComponent> getChildren() {
        throw new UnsupportedOperationException();
    }
}
