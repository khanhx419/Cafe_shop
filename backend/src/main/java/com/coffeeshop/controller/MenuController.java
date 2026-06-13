package com.coffeeshop.controller;

import com.coffeeshop.entity.Drink;
import com.coffeeshop.repository.DrinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drinks")
public class MenuController {

    @Autowired
    private DrinkRepository drinkRepository;

    @GetMapping
    public List<Drink> getAllDrinks() {
        return drinkRepository.findAll();
    }

    @PostMapping
    public Drink addDrink(@RequestBody Drink drink) {
        return drinkRepository.save(drink);
    }

    @DeleteMapping("/{id}")
    public void deleteDrink(@PathVariable Long id) {
        drinkRepository.deleteById(id);
    }
}
