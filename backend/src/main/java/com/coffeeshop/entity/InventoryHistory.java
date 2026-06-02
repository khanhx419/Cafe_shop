package com.coffeeshop.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class InventoryHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

    @Column(nullable = false)
    private int amountChanged;

    @Column(nullable = false)
    private Date changedAt = new Date();

    @Column(nullable = false)
    private String reason;

    public InventoryHistory() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Inventory getInventory() { return inventory; }
    public void setInventory(Inventory inventory) { this.inventory = inventory; }

    public int getAmountChanged() { return amountChanged; }
    public void setAmountChanged(int amountChanged) { this.amountChanged = amountChanged; }

    public Date getChangedAt() { return changedAt; }
    public void setChangedAt(Date changedAt) { this.changedAt = changedAt; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
