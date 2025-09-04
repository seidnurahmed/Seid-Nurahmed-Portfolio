package com.example.demo.service;

import com.example.demo.entity.Item;
import com.example.demo.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository repo;

    public ItemService(ItemRepository repo) {
        this.repo = repo;
    }

    public List<Item> getAll() { return repo.findAll(); }

    public Item getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Item not found: " + id));
    }

    public Item create(Item item) {
        item.setId(null);
        return repo.save(item);
    }

    public Item update(Long id, Item payload) {
        return repo.findById(id).map(i -> {
            i.setName(payload.getName());
            i.setDescription(payload.getDescription());
            return repo.save(i);
        }).orElseThrow(() -> new IllegalArgumentException("Item not found: " + id));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
