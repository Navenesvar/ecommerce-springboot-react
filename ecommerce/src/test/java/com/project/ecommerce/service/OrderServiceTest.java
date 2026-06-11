package com.project.ecommerce.service;

import com.project.ecommerce.entity.Cart;
import com.project.ecommerce.entity.Order;
import com.project.ecommerce.entity.Product;
import com.project.ecommerce.entity.User;
import com.project.ecommerce.repository.CartRepository;
import com.project.ecommerce.repository.OrderRepository;
import com.project.ecommerce.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private CartRepository cartRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderService orderService;

    private Cart cart;
    private Product product;
    private User user;
    private Order order;

    @BeforeEach
    void setup() {

        product = new Product();
        product.setId(1L);
        product.setName("Laptop");
        product.setPrice(75000.0);

        cart = new Cart();
        cart.setId(1L);
        cart.setUserId(4L);
        cart.setQuantity(2);
        cart.setProduct(product);

        user = new User();
        user.setId(4L);
        user.setEmail("naven@gmail.com");

        order = new Order();
        order.setId(1L);
        order.setUserId(4L);
        order.setQuantity(2);
        order.setProduct(product);
    }

    @Test
    void testPlaceOrder() {

        when(cartRepository.findAll())
                .thenReturn(List.of(cart));

        orderService.placeOrder();

        verify(orderRepository, times(1))
                .save(any(Order.class));

        verify(cartRepository, times(1))
                .deleteAll();
    }

    @Test
    void testGetMyOrders() {

        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(
                        "naven@gmail.com",
                        null
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(auth);

        when(userRepository.findByEmail(
                "naven@gmail.com"))
                .thenReturn(Optional.of(user));

        when(orderRepository.findByUserId(4L))
                .thenReturn(List.of(order));

        List<Order> result =
                orderService.getMyOrders();

        assertEquals(1, result.size());

        verify(userRepository)
                .findByEmail("naven@gmail.com");

        verify(orderRepository)
                .findByUserId(4L);
    }

    @Test
    void testGetMyOrdersEmpty() {

        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(
                        "naven@gmail.com",
                        null
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(auth);

        when(userRepository.findByEmail(
                "naven@gmail.com"))
                .thenReturn(Optional.of(user));

        when(orderRepository.findByUserId(4L))
                .thenReturn(List.of());

        List<Order> result =
                orderService.getMyOrders();

        assertTrue(result.isEmpty());
    }
}