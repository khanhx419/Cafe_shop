package com.coffeeshop.repository;

import com.coffeeshop.entity.Topping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToppingRepository extends JpaRepository<Topping, String> {
}
