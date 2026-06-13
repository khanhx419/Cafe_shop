package com.coffeeshop.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private Date createdAt = new Date();

    @Column(nullable = false)
    private String status; // e.g. NEW, IN_PROGRESS, DONE, CANCELLED

    private int totalPrice;

    private boolean isPriority;

    public Order() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getTotalPrice() { return totalPrice; }
    public void setTotalPrice(int totalPrice) { this.totalPrice = totalPrice; }

    public boolean isPriority() { return isPriority; }
    public void setPriority(boolean isPriority) { this.isPriority = isPriority; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
