package com.coffeeshop.controller;

import com.coffeeshop.entity.Combo;
import com.coffeeshop.entity.ComboItem;
import com.coffeeshop.entity.Topping;
import com.coffeeshop.repository.ComboRepository;
import com.coffeeshop.repository.ToppingRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MenuExtrasController {

    @Autowired
    private ToppingRepository toppingRepository;

    @Autowired
    private ComboRepository comboRepository;

    @GetMapping("/toppings")
    public List<Topping> getToppings() {
        return toppingRepository.findAll();
    }

    @GetMapping("/combos")
    public List<Combo> getCombos() {
        return comboRepository.findAll();
    }

    // Seed Data Initialization
    @PostConstruct
    public void initSeedData() {
        if (toppingRepository.count() == 0) {
            toppingRepository.saveAll(Arrays.asList(
                    new Topping("t1", "Trân châu hoàng kim", 5000, true),
                    new Topping("t2", "Thạch sương sáo", 5000, true),
                    new Topping("t3", "Kem tươi Macchiato", 7000, true),
                    new Topping("t4", "Pudding trứng", 6000, true)
            ));
        }

        if (comboRepository.count() == 0) {
            Combo combo = new Combo(
                    501L,
                    "Combo Bữa Sáng",
                    "Cà phê sữa đá + Bánh Croissant (Tiết kiệm 10%)",
                    10,
                    true,
                    Arrays.asList(
                            new ComboItem(201L, "Cà phê sữa đá", 29000, 1),
                            new ComboItem(301L, "Bánh Croissant", 25000, 1)
                    )
            );
            comboRepository.save(combo);
        }
    }
}
