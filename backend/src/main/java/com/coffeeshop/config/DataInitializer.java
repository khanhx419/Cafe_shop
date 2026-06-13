package com.coffeeshop.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Không khởi tạo dữ liệu giả ở đây nữa
        // Dữ liệu sẽ được thêm qua giao diện hoặc API sau
        System.out.println("Backend is running...");
    }
}
