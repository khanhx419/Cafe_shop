package com.coffeeshop.pattern.composite;

import java.util.ArrayList;
import java.util.List;

/**
 * Composite node - category contains menu items or subcategories.
 */
public class MenuCategory extends MenuComponent {
    private List<MenuComponent> children = new ArrayList<>();

    public MenuCategory(String name, String description) {
        super(name, description);
    }

    @Override
    public void add(MenuComponent component) {
        children.add(component);
    }

    @Override
    public void remove(MenuComponent component) {
        children.remove(component);
    }

    @Override
    public List<MenuComponent> getChildren() {
        return children;
    }

    @Override
    public String getType() {
        return "CATEGORY";
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "[" + name + "]");
        for (MenuComponent child : children) {
            child.display(indent + "   ");
        }
    }

    @Override
    public double getPrice() {
        // Sum all child prices recursively
        double total = 0;
        for (MenuComponent child : children) {
            total += child.getPrice();
        }
        return total;
    }
}
