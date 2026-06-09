package com.project.ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.project.ecommerce.entity.Order;
import com.project.ecommerce.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping("/place")
    public String placeOrder() {

        service.placeOrder();

        return "Order placed successfully";
    }

    @GetMapping("/my-orders")
public List<Order> getMyOrders() {

    System.out.println("MY ORDERS API HIT");

    return service.getMyOrders();
}
}