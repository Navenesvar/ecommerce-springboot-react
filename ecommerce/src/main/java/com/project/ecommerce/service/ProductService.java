package com.project.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.ecommerce.entity.Product;
import com.project.ecommerce.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Product save(Product product) {
        return repository.save(product);
    }

    public List<Product> getAll() {
        return repository.findAll();
    }

    public Optional<Product> getById(Long id) {
        return repository.findById(id);
    }
    public Product update(Long id, Product updatedProduct) {

    Product product =
            repository.findById(id)
                    .orElseThrow();

    product.setName(
            updatedProduct.getName());

    product.setDescription(
            updatedProduct.getDescription());

    product.setPrice(
            updatedProduct.getPrice());

    product.setImageUrl(
            updatedProduct.getImageUrl());

    return repository.save(product);
}

    public void delete(Long id) {
        repository.deleteById(id);
    }
}