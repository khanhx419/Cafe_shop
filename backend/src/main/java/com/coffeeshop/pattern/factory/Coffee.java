package com.coffeeshop.pattern.factory;

/**
 * Lớp đại diện cho đồ uống cà phê.
 * Kế thừa từ Beverage, triển khai phương thức pha chế cà phê.
 */
public class Coffee extends Beverage {

    /**
     * Constructor tạo cà phê với tên và giá.
     *
     * @param name  tên cà phê
     * @param price giá cà phê (VND)
     */
    public Coffee(String name, double price) {
        super(name, price);
        setType("COFFEE");
        setDescription("Cà phê nguyên chất được pha từ hạt cà phê chọn lọc");
    }

    /**
     * Mô tả quy trình pha chế cà phê.
     *
     * @return chuỗi mô tả các bước pha cà phê
     */
    @Override
    public String prepare() {
        return "Pha cà phê: xay hạt, pha phin, thêm sữa đá...";
    }
}
