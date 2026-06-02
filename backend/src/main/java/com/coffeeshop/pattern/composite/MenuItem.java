package com.coffeeshop.pattern.composite;

/**
 * Leaf node - single menu item/food or drink.
 */
public class MenuItem extends MenuComponent {
    private double price;
    private String beverageType;

    public MenuItem(String name, String description, double price, String beverageType) {
        super(name, description);
        this.price = price;
        this.beverageType = beverageType;
    }

    @Override
    public void display(String indent) {
        System.out.printf("%s%s — %.0f₫\n", indent, name, price);
    }

    @Override
    public double getPrice() {
        return price;
    }

    @Override
    public String getType() {
        return "ITEM";
    }
}
