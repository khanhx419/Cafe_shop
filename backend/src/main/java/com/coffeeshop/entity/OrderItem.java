package com.coffeeshop.entity;

import javax.persistence.*;

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "drink_id")
    private Drink drink;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id")
    private Order order;

    private int quantity;

    public OrderItem() {}

    public OrderItem(Drink drink, Order order, int quantity) {
        this.drink = drink;
        this.order = order;
        this.quantity = quantity;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Drink getDrink() { return drink; }
    public void setDrink(Drink drink) { this.drink = drink; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
