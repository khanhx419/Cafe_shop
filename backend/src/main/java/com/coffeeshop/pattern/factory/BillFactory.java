package com.coffeeshop.pattern.factory;

/**
 * Factory tạo các loại hóa đơn dựa trên loại được chỉ định.
 * Hỗ trợ tạo hóa đơn tiêu chuẩn và hóa đơn VAT.
 */
public class BillFactory {

    /**
     * Tạo hóa đơn tiêu chuẩn (không có thông tin công ty).
     *
     * @param type         loại hóa đơn (STANDARD hoặc VAT)
     * @param orderId      mã đơn hàng
     * @param customerName tên khách hàng
     * @param subtotal     tổng tiền trước thuế
     * @return đối tượng Bill tương ứng
     * @throws IllegalArgumentException nếu loại hóa đơn không hợp lệ
     */
    public static Bill createBill(String type, Long orderId, String customerName, double subtotal) {
        switch (type.toUpperCase()) {
            case "STANDARD":
                return new StandardInvoice(orderId, customerName, subtotal);
            case "VAT":
                return new VATInvoice(orderId, customerName, subtotal, "", "");
            default:
                throw new IllegalArgumentException("Loại hóa đơn không hợp lệ: " + type);
        }
    }

    /**
     * Tạo hóa đơn VAT với thông tin công ty đầy đủ.
     *
     * @param type         loại hóa đơn
     * @param orderId      mã đơn hàng
     * @param customerName tên khách hàng
     * @param subtotal     tổng tiền trước thuế
     * @param companyName  tên công ty
     * @param taxCode      mã số thuế
     * @return đối tượng Bill tương ứng
     * @throws IllegalArgumentException nếu loại hóa đơn không hợp lệ
     */
    public static Bill createBill(String type, Long orderId, String customerName,
                                   double subtotal, String companyName, String taxCode) {
        switch (type.toUpperCase()) {
            case "STANDARD":
                return new StandardInvoice(orderId, customerName, subtotal);
            case "VAT":
                return new VATInvoice(orderId, customerName, subtotal, companyName, taxCode);
            default:
                throw new IllegalArgumentException("Loại hóa đơn không hợp lệ: " + type);
        }
    }
}
