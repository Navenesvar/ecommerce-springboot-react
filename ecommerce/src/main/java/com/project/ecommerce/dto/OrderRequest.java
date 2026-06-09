package com.project.ecommerce.dto;

import lombok.Data;

@Data
public class OrderRequest {

    private Long userId;
    private Double totalAmount;
}