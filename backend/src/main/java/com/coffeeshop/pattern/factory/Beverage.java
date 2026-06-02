package com.coffeeshop.pattern.factory;

/**
 * Lớp trừu tượng đại diện cho một đồ uống trong quán cà phê.
 * Sử dụng Factory Method Pattern để tạo các loại đồ uống khác nhau.
 */
public abstract class Beverage {

    private String name;
    private double price;
    private String description;
    private String type; // COFFEE, MILK_TEA, SMOOTHIE

    /**
     * Constructor mặc định.
     */
    public Beverage() {
    }

    /**
     * Constructor với tên và giá.
     *
     * @param name  tên đồ uống
     * @param price giá đồ uống (VND)
     */
    public Beverage(String name, double price) {
        this.name = name;
        this.price = price;
    }

    /**
     * Constructor đầy đủ thông tin.
     *
     * @param name        tên đồ uống
     * @param price       giá đồ uống (VND)
     * @param description mô tả đồ uống
     * @param type        loại đồ uống (COFFEE, MILK_TEA, SMOOTHIE)
     */
    public Beverage(String name, double price, String description, String type) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.type = type;
    }

    /**
     * Phương thức trừu tượng mô tả cách pha chế đồ uống.
     *
     * @return chuỗi mô tả quy trình pha chế
     */
    public abstract String prepare();

    // === Getters & Setters ===

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return String.format("%s [%s] - %.0f VND", name, type, price);
    }
}
