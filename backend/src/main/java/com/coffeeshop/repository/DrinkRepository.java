package com.coffeeshop.repository;

import com.coffeeshop.entity.Drink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrinkRepository extends JpaRepository<Drink, Long> {
    // Derived queries can be added here if needed
}
