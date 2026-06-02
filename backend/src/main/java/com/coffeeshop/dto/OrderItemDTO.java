package com.coffeeshop.dto;

public class OrderItemDTO {
    private Long id;
    private Long drinkId;
    private String drinkName;
    private int quantity;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getDrinkId() { return drinkId; }
    public void setDrinkId(Long drinkId) { this.drinkId = drinkId; }

    public String getDrinkName() { return drinkName; }
    public void setDrinkName(String drinkName) { this.drinkName = drinkName; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
