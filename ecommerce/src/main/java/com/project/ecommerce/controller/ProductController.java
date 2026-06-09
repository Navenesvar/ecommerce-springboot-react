package com.project.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.project.ecommerce.entity.Product;
import com.project.ecommerce.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }
    @GetMapping("/admin-test")
@PreAuthorize("hasRole('ADMIN')")
public String adminTest() {
    return "ADMIN ACCESS";
}
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Product createProduct(
            @RequestBody Product product) {

        return service.save(product);
    }

    @GetMapping
    public List<Product> getProducts() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Product> getProduct(
            @PathVariable Long id) {

        return service.getById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Product updateProduct(
        @PathVariable Long id,
        @RequestBody Product product) {

        return service.update(id, product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        service.delete(id);

        return "Product Deleted";
    }
}