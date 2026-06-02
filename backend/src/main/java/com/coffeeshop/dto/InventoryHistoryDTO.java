package com.coffeeshop.dto;

import java.util.Date;

public class InventoryHistoryDTO {
    private Long id;
    private Long inventoryId;
    private int amountChanged;
    private Date changedAt;
    private String reason;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getInventoryId() { return inventoryId; }
    public void setInventoryId(Long inventoryId) { this.inventoryId = inventoryId; }

    public int getAmountChanged() { return amountChanged; }
    public void setAmountChanged(int amountChanged) { this.amountChanged = amountChanged; }

    public Date getChangedAt() { return changedAt; }
    public void setChangedAt(Date changedAt) { this.changedAt = changedAt; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
