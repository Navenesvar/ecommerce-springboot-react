package com.project.ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.project.ecommerce.dto.CartRequest;
import com.project.ecommerce.entity.Cart;
import com.project.ecommerce.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @PostMapping
    public Cart addToCart(
            @RequestBody CartRequest request) {

        return service.addToCart(request);
    }

    @GetMapping
    public List<Cart> getCartItems() {
        return service.getCartItems();
    }

    @DeleteMapping("/{id}")
    public String removeItem(
            @PathVariable Long id) {

        service.removeItem(id);

        return "Item Removed";
    }
}