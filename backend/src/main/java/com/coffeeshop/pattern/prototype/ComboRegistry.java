package com.coffeeshop.pattern.prototype;

import java.util.HashMap;
import java.util.Map;

/**
 * Registry lưu trữ và quản lý các combo mẫu (prototype).
 * Cho phép đăng ký combo mẫu và nhân bản chúng khi cần.
 */
public class ComboRegistry {

    private final Map<String, ComboPrototype> registry = new HashMap<>();

    /**
     * Đăng ký một combo mẫu vào registry.
     *
     * @param key       khóa định danh cho combo
     * @param prototype đối tượng combo mẫu
     */
    public void addCombo(String key, ComboPrototype prototype) {
        registry.put(key, prototype);
    }

    /**
     * Lấy bản sao của combo mẫu từ registry.
     *
     * @param key khóa định danh của combo
     * @return bản sao (clone) của combo mẫu
     * @throws IllegalArgumentException nếu không tìm thấy combo với khóa đã cho
     */
    public ComboPrototype getCombo(String key) {
        ComboPrototype prototype = registry.get(key);
        if (prototype == null) {
            throw new IllegalArgumentException("Không tìm thấy combo mẫu với khóa: " + key);
        }
        return prototype.clone();
    }

    /**
     * Kiểm tra xem registry có chứa combo với khóa đã cho không.
     *
     * @param key khóa cần kiểm tra
     * @return true nếu tồn tại, false nếu không
     */
    public boolean containsCombo(String key) {
        return registry.containsKey(key);
    }

    /**
     * Lấy tất cả các khóa combo trong registry.
     *
     * @return tập hợp các khóa
     */
    public java.util.Set<String> getAllKeys() {
        return registry.keySet();
    }
}
