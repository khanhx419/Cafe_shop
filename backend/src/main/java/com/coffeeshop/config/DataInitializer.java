package com.coffeeshop.config;

import com.coffeeshop.model.entity.ComboEntity;
import com.coffeeshop.model.entity.ComboItemEntity;
import com.coffeeshop.model.entity.InventoryComponentEntity;
import com.coffeeshop.model.entity.MenuComponentEntity;
import com.coffeeshop.model.entity.ToppingEntity;
import com.coffeeshop.repository.ComboItemRepository;
import com.coffeeshop.repository.ComboRepository;
import com.coffeeshop.repository.InventoryComponentRepository;
import com.coffeeshop.repository.MenuComponentRepository;
import com.coffeeshop.repository.ToppingRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Khởi tạo dữ liệu mẫu cho hệ thống quán cà phê.
 * Chạy tự động khi ứng dụng khởi động, kiểm tra trước khi thêm để tránh trùng lặp.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final MenuComponentRepository menuComponentRepository;
    private final ToppingRepository toppingRepository;
    private final ComboRepository comboRepository;
    private final ComboItemRepository comboItemRepository;
    private final InventoryComponentRepository inventoryComponentRepository;

    /**
     * Constructor injection cho các repository cần thiết.
     */
    public DataInitializer(MenuComponentRepository menuComponentRepository,
                           ToppingRepository toppingRepository,
                           ComboRepository comboRepository,
                           ComboItemRepository comboItemRepository,
                           InventoryComponentRepository inventoryComponentRepository) {
        this.menuComponentRepository = menuComponentRepository;
        this.toppingRepository = toppingRepository;
        this.comboRepository = comboRepository;
        this.comboItemRepository = comboItemRepository;
        this.inventoryComponentRepository = inventoryComponentRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        initMenuData();
        initToppingData();
        initComboData();
        initInventoryData();
    }

    /**
     * Khởi tạo dữ liệu danh mục và đồ uống trong menu.
     */
    private void initMenuData() {
        if (menuComponentRepository.count() > 0) {
            return;
        }

        // Tạo các danh mục
        MenuComponentEntity hotDrinks = new MenuComponentEntity();
        hotDrinks.setName("Đồ uống nóng");
        hotDrinks.setDescription("Các loại đồ uống nóng");
        hotDrinks.setComponentType("CATEGORY");
        hotDrinks = menuComponentRepository.save(hotDrinks);

        MenuComponentEntity coldDrinks = new MenuComponentEntity();
        coldDrinks.setName("Đồ uống lạnh");
        coldDrinks.setDescription("Các loại đồ uống lạnh");
        coldDrinks.setComponentType("CATEGORY");
        coldDrinks = menuComponentRepository.save(coldDrinks);

        MenuComponentEntity pastries = new MenuComponentEntity();
        pastries.setName("Bánh ngọt");
        pastries.setDescription("Các loại bánh ngọt");
        pastries.setComponentType("CATEGORY");
        pastries = menuComponentRepository.save(pastries);

        // Tạo các đồ uống - Đồ uống lạnh
        createMenuItem("Cà phê sữa đá", "Cà phê sữa đá truyền thống", 29000, "COFFEE", coldDrinks);
        createMenuItem("Cà phê đen", "Cà phê đen nguyên chất", 25000, "COFFEE", hotDrinks);

        // Trà sữa
        createMenuItem("Trà sữa Oolong", "Trà sữa Oolong thơm ngon", 35000, "MILK_TEA", coldDrinks);
        createMenuItem("Trà sữa Truyền thống", "Trà sữa truyền thống đậm đà", 30000, "MILK_TEA", coldDrinks);

        // Sinh tố
        createMenuItem("Sinh tố Bơ", "Sinh tố bơ béo ngậy", 40000, "SMOOTHIE", coldDrinks);
        createMenuItem("Sinh tố Dâu", "Sinh tố dâu tươi mát", 38000, "SMOOTHIE", coldDrinks);

        // Bánh ngọt
        createMenuItem("Bánh Croissant", "Bánh sừng bò giòn thơm", 25000, "PASTRY", pastries);
        createMenuItem("Bánh Tiramisu", "Bánh Tiramisu vị cà phê", 35000, "PASTRY", pastries);
    }

    /**
     * Tạo một mục menu đồ uống/thức ăn.
     */
    private void createMenuItem(String name, String description, double price,
                                 String beverageType, MenuComponentEntity parent) {
        MenuComponentEntity item = new MenuComponentEntity();
        item.setName(name);
        item.setDescription(description);
        item.setPrice(price);
        item.setComponentType("ITEM");
        item.setBeverageType(beverageType);
        item.setParent(parent);
        menuComponentRepository.save(item);
    }

    /**
     * Khởi tạo dữ liệu topping.
     */
    private void initToppingData() {
        if (toppingRepository.count() > 0) {
            return;
        }

        createTopping("Trân châu", 5000);
        createTopping("Thạch", 5000);
        createTopping("Kem tươi", 7000);
        createTopping("Pudding", 6000);
    }

    /**
     * Tạo một topping mới.
     */
    private void createTopping(String name, double price) {
        ToppingEntity topping = new ToppingEntity();
        topping.setName(name);
        topping.setPrice(price);
        topping.setAvailable(true);
        toppingRepository.save(topping);
    }

    /**
     * Khởi tạo dữ liệu combo.
     */
    private void initComboData() {
        if (comboRepository.count() > 0) {
            return;
        }

        // Tạo combo Bữa Sáng
        ComboEntity combo = new ComboEntity();
        combo.setName("Combo Bữa Sáng");
        combo.setDescription("Cà phê sữa đá + Bánh Croissant");
        combo.setDiscountPercent(10.0);
        combo.setIsTemplate(true);
        combo = comboRepository.save(combo);

        // Tìm các menu item để thêm vào combo
        MenuComponentEntity caPheSuaDa = menuComponentRepository.findAll().stream()
                .filter(m -> "Cà phê sữa đá".equals(m.getName()))
                .findFirst().orElse(null);

        MenuComponentEntity banhCroissant = menuComponentRepository.findAll().stream()
                .filter(m -> "Bánh Croissant".equals(m.getName()))
                .findFirst().orElse(null);

        if (caPheSuaDa != null) {
            ComboItemEntity comboItem1 = new ComboItemEntity();
            comboItem1.setCombo(combo);
            comboItem1.setMenuItem(caPheSuaDa);
            comboItem1.setQuantity(1);
            comboItemRepository.save(comboItem1);
        }

        if (banhCroissant != null) {
            ComboItemEntity comboItem2 = new ComboItemEntity();
            comboItem2.setCombo(combo);
            comboItem2.setMenuItem(banhCroissant);
            comboItem2.setQuantity(1);
            comboItemRepository.save(comboItem2);
        }
    }

    /**
     * Khởi tạo dữ liệu kho hàng.
     */
    private void initInventoryData() {
        if (inventoryComponentRepository.count() > 0) {
            return;
        }

        createInventoryItem("Cà phê Arabica 500g", "g", 20);
        createInventoryItem("Trà Oolong 200g", "g", 30);
        createInventoryItem("Sữa tươi 1L", "L", 50);
        createInventoryItem("Đường 1kg", "kg", 15);
        createInventoryItem("Trân châu 500g", "g", 25);
    }

    /**
     * Tạo một mục kho hàng mới.
     */
    private void createInventoryItem(String name, String unit, int quantity) {
        InventoryComponentEntity item = new InventoryComponentEntity();
        item.setName(name);
        item.setComponentType("ITEM");
        item.setUnit(unit);
        item.setQuantity(quantity);
        inventoryComponentRepository.save(item);
    }
}
