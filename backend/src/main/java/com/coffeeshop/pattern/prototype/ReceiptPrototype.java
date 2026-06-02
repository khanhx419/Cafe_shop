package com.coffeeshop.pattern.prototype;

/**
 * Interface Prototype cho biên lai điện tử (E-Receipt).
 * Cho phép nhân bản biên lai mẫu để tái sử dụng cấu trúc.
 */
public interface ReceiptPrototype extends Cloneable {

    /**
     * Nhân bản đối tượng biên lai.
     *
     * @return bản sao của biên lai
     */
    ReceiptPrototype clone();
}
