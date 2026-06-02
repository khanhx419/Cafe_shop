package com.coffeeshop.pattern.factory;

/**
 * Lớp đại diện cho đồ uống trà sữa.
 * Kế thừa từ Beverage, triển khai phương thức pha chế trà sữa.
 */
public class MilkTea extends Beverage {

    /**
     * Constructor tạo trà sữa với tên và giá.
     *
     * @param name  tên trà sữa
     * @param price giá trà sữa (VND)
     */
    public MilkTea(String name, double price) {
        super(name, price);
        setType("MILK_TEA");
        setDescription("Trà sữa thơm ngon với nhiều hương vị");
    }

    /**
     * Mô tả quy trình pha chế trà sữa.
     *
     * @return chuỗi mô tả các bước pha trà sữa
     */
    @Override
    public String prepare() {
        return "Pha trà sữa: hãm trà, thêm sữa, thêm đường...";
    }
}
