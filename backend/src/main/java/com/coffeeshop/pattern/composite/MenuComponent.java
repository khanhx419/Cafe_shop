package com.coffeeshop.pattern.composite;

import java.util.List;

/**
 * Abstract base/component for menu composite tree pattern.
 */
public abstract class MenuComponent {
    protected String name;
    protected String description;

    public MenuComponent(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() { return name; }
    public String getDescription() { return description; }

    public abstract void display(String indent);
    public abstract double getPrice();
    public abstract String getType();
    public void add(MenuComponent component) {
        throw new UnsupportedOperationException();
    }
    public void remove(MenuComponent component) {
        throw new UnsupportedOperationException();
    }
    public List<MenuComponent> getChildren() {
        throw new UnsupportedOperationException();
    }
}
