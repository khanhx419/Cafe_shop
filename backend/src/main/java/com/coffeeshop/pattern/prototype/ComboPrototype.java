package com.coffeeshop.pattern.prototype;

/**
 * Interface Prototype cho Combo đồ uống.
 * Cho phép nhân bản (clone) các combo mẫu để tạo combo mới.
 */
public interface ComboPrototype extends Cloneable {

    /**
     * Nhân bản đối tượng combo.
     *
     * @return bản sao của combo
     */
    ComboPrototype clone();

    /**
     * Lấy tên combo.
     *
     * @return tên combo
     */
    String getComboName();

    /**
     * Lấy giá combo sau giảm giá.
     *
     * @return giá combo đã áp dụng khuyến mãi (VND)
     */
    double getComboPrice();
}
