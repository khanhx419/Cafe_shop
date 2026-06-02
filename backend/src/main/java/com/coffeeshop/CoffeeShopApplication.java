package com.coffeeshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Lớp khởi chạy chính của ứng dụng Quản lý Quán Cà Phê.
 * Sử dụng Spring Boot để cấu hình và khởi tạo toàn bộ hệ thống.
 */
@SpringBootApplication
public class CoffeeShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoffeeShopApplication.class, args);
    }
}
