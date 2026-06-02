package com.coffeeshop.pattern.factory;

/**
 * Hóa đơn tiêu chuẩn - không bao gồm thuế VAT chi tiết.
 * Dành cho khách hàng cá nhân không cần xuất hóa đơn đỏ.
 */
public class StandardInvoice extends Bill {

    /**
     * Constructor tạo hóa đơn tiêu chuẩn.
     *
     * @param orderId      mã đơn hàng
     * @param customerName tên khách hàng
     * @param subtotal     tổng tiền
     */
    public StandardInvoice(Long orderId, String customerName, double subtotal) {
        super(orderId, customerName, subtotal);
        setTaxAmount(0);
        setTotal(subtotal);
    }

    /**
     * Lấy loại hóa đơn.
     *
     * @return "STANDARD"
     */
    @Override
    public String getBillType() {
        return "STANDARD";
    }

    /**
     * Tạo nội dung hóa đơn tiêu chuẩn.
     *
     * @return chuỗi hóa đơn đã format
     */
    @Override
    public String generateBill() {
        StringBuilder sb = new StringBuilder();
        sb.append("========================================\n");
        sb.append("         HÓA ĐƠN BÁN HÀNG\n");
        sb.append("        COFFEE SHOP MANAGEMENT\n");
        sb.append("========================================\n");
        sb.append(String.format("Mã đơn hàng : #%d\n", getOrderId()));
        sb.append(String.format("Khách hàng   : %s\n", getCustomerName()));
        sb.append(String.format("Ngày giờ     : %s\n", getFormattedDateTime()));
        sb.append("----------------------------------------\n");
        sb.append(String.format("Tổng tiền    : %,.0f VND\n", getSubtotal()));
        sb.append("========================================\n");
        sb.append("     Cảm ơn quý khách! Hẹn gặp lại!\n");
        sb.append("========================================\n");
        return sb.toString();
    }
}
