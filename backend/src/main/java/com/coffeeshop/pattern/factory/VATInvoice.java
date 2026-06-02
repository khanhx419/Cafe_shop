package com.coffeeshop.pattern.factory;

/**
 * Hóa đơn VAT (hóa đơn đỏ) - bao gồm thông tin công ty và thuế VAT 10%.
 * Dành cho khách hàng doanh nghiệp cần xuất hóa đơn VAT.
 */
public class VATInvoice extends Bill {

    private String companyName;
    private String taxCode;

    /**
     * Constructor tạo hóa đơn VAT.
     *
     * @param orderId      mã đơn hàng
     * @param customerName tên khách hàng
     * @param subtotal     tổng tiền trước thuế
     * @param companyName  tên công ty
     * @param taxCode      mã số thuế
     */
    public VATInvoice(Long orderId, String customerName, double subtotal,
                      String companyName, String taxCode) {
        super(orderId, customerName, subtotal);
        this.companyName = companyName;
        this.taxCode = taxCode;
        // Tính thuế VAT 10%
        double tax = subtotal * 0.10;
        setTaxAmount(tax);
        setTotal(subtotal + tax);
    }

    /**
     * Lấy loại hóa đơn.
     *
     * @return "VAT"
     */
    @Override
    public String getBillType() {
        return "VAT";
    }

    /**
     * Tạo nội dung hóa đơn VAT với thông tin thuế chi tiết.
     *
     * @return chuỗi hóa đơn VAT đã format
     */
    @Override
    public String generateBill() {
        StringBuilder sb = new StringBuilder();
        sb.append("========================================\n");
        sb.append("       HÓA ĐƠN GIÁ TRỊ GIA TĂNG\n");
        sb.append("        COFFEE SHOP MANAGEMENT\n");
        sb.append("========================================\n");
        sb.append(String.format("Mã đơn hàng  : #%d\n", getOrderId()));
        sb.append(String.format("Khách hàng   : %s\n", getCustomerName()));
        sb.append(String.format("Công ty      : %s\n", companyName));
        sb.append(String.format("Mã số thuế   : %s\n", taxCode));
        sb.append(String.format("Ngày giờ     : %s\n", getFormattedDateTime()));
        sb.append("----------------------------------------\n");
        sb.append(String.format("Tổng tiền hàng : %,.0f VND\n", getSubtotal()));
        sb.append(String.format("Thuế VAT (10%%): %,.0f VND\n", getTaxAmount()));
        sb.append("----------------------------------------\n");
        sb.append(String.format("TỔNG CỘNG     : %,.0f VND\n", getTotal()));
        sb.append("========================================\n");
        sb.append("     Cảm ơn quý khách! Hẹn gặp lại!\n");
        sb.append("========================================\n");
        return sb.toString();
    }

    // === Getters & Setters ===

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }
}
