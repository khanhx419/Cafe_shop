package com.coffeeshop.pattern.factory;

/**
 * Factory tạo các loại đồ uống dựa trên loại được chỉ định.
 * Áp dụng Factory Method Pattern để đóng gói logic tạo đối tượng.
 */
public class BeverageFactory {

    /**
     * Tạo đồ uống dựa trên loại, tên và giá.
     *
     * @param type  loại đồ uống (COFFEE, MILK_TEA, SMOOTHIE)
     * @param name  tên đồ uống
     * @param price giá đồ uống (VND)
     * @return đối tượng Beverage tương ứng
     * @throws IllegalArgumentException nếu loại đồ uống không hợp lệ
     */
    public static Beverage createBeverage(String type, String name, double price) {
        switch (type.toUpperCase()) {
            case "COFFEE":
                return new Coffee(name, price);
            case "MILK_TEA":
                return new MilkTea(name, price);
            case "SMOOTHIE":
                return new Smoothie(name, price);
            default:
                throw new IllegalArgumentException("Loại đồ uống không hợp lệ: " + type);
        }
    }
}
