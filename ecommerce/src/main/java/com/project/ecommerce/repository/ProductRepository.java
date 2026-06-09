package com.project.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.ecommerce.entity.Product;

public interface ProductRepository
        extends JpaRepository<Product, Long> {
}