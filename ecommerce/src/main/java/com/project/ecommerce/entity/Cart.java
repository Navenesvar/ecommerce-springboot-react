package com.project.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}