package com.coffeeshop.pattern.factory;

/**
 * Lớp đại diện cho đồ uống sinh tố.
 * Kế thừa từ Beverage, triển khai phương thức pha chế sinh tố.
 */
public class Smoothie extends Beverage {

    /**
     * Constructor tạo sinh tố với tên và giá.
     *
     * @param name  tên sinh tố
     * @param price giá sinh tố (VND)
     */
    public Smoothie(String name, double price) {
        super(name, price);
        setType("SMOOTHIE");
        setDescription("Sinh tố tươi mát từ trái cây tự nhiên");
    }

    /**
     * Mô tả quy trình pha chế sinh tố.
     *
     * @return chuỗi mô tả các bước pha sinh tố
     */
    @Override
    public String prepare() {
        return "Pha sinh tố: xay trái cây, thêm đá, sữa...";
    }
}
