package com.coffeeshop.dto;

public class OrderItemRequestDTO {
    private MenuItemDTO menuItem;
    private int quantity;
    private String customDescription;
    private int decoratedCost;

    public MenuItemDTO getMenuItem() { return menuItem; }
    public void setMenuItem(MenuItemDTO menuItem) { this.menuItem = menuItem; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getCustomDescription() { return customDescription; }
    public void setCustomDescription(String customDescription) { this.customDescription = customDescription; }

    public int getDecoratedCost() { return decoratedCost; }
    public void setDecoratedCost(int decoratedCost) { this.decoratedCost = decoratedCost; }

    public static class MenuItemDTO {
        private Long id;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }
}
