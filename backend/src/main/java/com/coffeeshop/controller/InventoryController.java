package com.coffeeshop.controller;

import com.coffeeshop.entity.Inventory;
import com.coffeeshop.entity.InventoryHistory;
import com.coffeeshop.repository.InventoryRepository;
import com.coffeeshop.repository.InventoryHistoryRepository;
import com.coffeeshop.dto.InventoryCommandRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private InventoryHistoryRepository historyRepository;

    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @PostMapping
    public Inventory addOrUpdateItem(@RequestBody Inventory item) {
        return inventoryRepository.save(item);
    }

    @jakarta.annotation.PostConstruct
    public void initSeedData() {
        if (inventoryRepository.count() == 0) {
            java.util.List<Inventory> initialItems = java.util.Arrays.asList(
                new Inventory("Cà phê hạt Arabica", 20, "kg"),
                new Inventory("Cà phê hạt Robusta", 15, "kg"),
                new Inventory("Sữa tươi Đà Lạt Milk", 50, "L"),
                new Inventory("Trà xanh Oolong lá", 10, "kg"),
                new Inventory("Bột kem béo sữa", 30, "kg"),
                new Inventory("Trân châu sống", 25, "kg"),
                new Inventory("Bột làm thạch sương sáo", 18, "kg")
            );
            inventoryRepository.saveAll(initialItems);
        }
    }

    @GetMapping("/history")
    public List<InventoryHistory> getHistory() {
        return historyRepository.findAll();
    }

    @PostMapping("/command")
    public InventoryHistory executeCommand(@RequestBody InventoryCommandRequestDTO request) {
        Inventory item = inventoryRepository.findById(request.getItemId()).orElseThrow(() -> new RuntimeException("Item not found"));
        int oldQty = item.getQuantity();
        int newQty = oldQty;

        if ("IMPORT".equals(request.getActionType())) {
            newQty += request.getQuantity();
        } else if ("EXPORT".equals(request.getActionType())) {
            if (oldQty < request.getQuantity()) {
                throw new RuntimeException("Không đủ hàng trong kho (Not enough inventory)");
            }
            newQty -= request.getQuantity();
        }

        item.setQuantity(newQty);
        inventoryRepository.save(item);

        InventoryHistory log = new InventoryHistory();
        log.setInventory(item);
        log.setActionType(request.getActionType());
        log.setQuantityBefore(oldQty);
        log.setQuantityAfter(newQty);
        log.setQuantityChanged(request.getQuantity());
        log.setPerformedBy(request.getPerformedBy());
        log.setTimestamp(new Date());

        return historyRepository.save(log);
    }

    @PostMapping("/undo")
    public InventoryHistory undoCommand() {
        List<InventoryHistory> all = historyRepository.findAll();
        InventoryHistory lastLog = null;
        for (int i = all.size() - 1; i >= 0; i--) {
            if (!all.get(i).isUndone()) {
                lastLog = all.get(i);
                break;
            }
        }
        if (lastLog == null) {
            throw new RuntimeException("Không có giao dịch nào để hoàn tác (No command to undo)");
        }

        Inventory item = lastLog.getInventory();
        int oldQty = item.getQuantity();
        int newQty = oldQty;

        if ("IMPORT".equals(lastLog.getActionType())) {
            newQty -= lastLog.getQuantityChanged();
        } else {
            newQty += lastLog.getQuantityChanged();
        }

        item.setQuantity(newQty);
        inventoryRepository.save(item);

        lastLog.setUndone(true);
        return historyRepository.save(lastLog);
    }
}
