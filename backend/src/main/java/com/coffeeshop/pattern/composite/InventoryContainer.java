package com.coffeeshop.pattern.composite;

import java.util.ArrayList;
import java.util.List;

/**
 * Composite node: container/folder for other inventory items or containers.
 */
public class InventoryContainer extends InventoryComponent {
    private List<InventoryComponent> children = new ArrayList<>();

    public InventoryContainer(String name, String unit) {
        super(name, unit);
    }

    @Override
    public void add(InventoryComponent component) {
        children.add(component);
    }

    @Override
    public void remove(InventoryComponent component) {
        children.remove(component);
    }

    @Override
    public List<InventoryComponent> getChildren() {
        return children;
    }

    @Override
    public int kiemTraSoLuong() {
        int total = 0;
        for (InventoryComponent child : children) {
            total += child.kiemTraSoLuong();
        }
        return total;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "[" + name + "]");
        for (InventoryComponent child : children) {
            child.display(indent + "   ");
        }
    }
}
