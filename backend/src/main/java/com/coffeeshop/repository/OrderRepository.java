package com.coffeeshop.repository;

import com.coffeeshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Custom methods can be added here
}
