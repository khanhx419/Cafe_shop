package com.coffeeshop.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Combo {
    @Id
    private Long id; // Using manual ID mapping since mockData uses 501
    
    private String name;
    private String description;
    private int discountPercent;
    private boolean isTemplate;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "combo_id")
    private List<ComboItem> items;

    public Combo() {}

    public Combo(Long id, String name, String description, int discountPercent, boolean isTemplate, List<ComboItem> items) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.discountPercent = discountPercent;
        this.isTemplate = isTemplate;
        this.items = items;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }

    public boolean isTemplate() { return isTemplate; }
    public void setTemplate(boolean template) { isTemplate = template; }

    public List<ComboItem> getItems() { return items; }
    public void setItems(List<ComboItem> items) { this.items = items; }
}
