package com.project.ecommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.project.ecommerce.entity.Cart;
import com.project.ecommerce.entity.Order;
import com.project.ecommerce.repository.CartRepository;
import com.project.ecommerce.repository.OrderRepository;
import com.project.ecommerce.repository.UserRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    public OrderService(
        OrderRepository orderRepository,
        CartRepository cartRepository,
        UserRepository userRepository) {

    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.userRepository = userRepository;
    }

    public void placeOrder() {

        List<Cart> cartItems =
                cartRepository.findAll();

        for (Cart cart : cartItems) {
             System.out.println(
        "Cart User ID = " +
        cart.getUserId()
    );

            Order order = new Order();

            order.setUserId(cart.getUserId());
            order.setQuantity(cart.getQuantity());
            order.setProduct(cart.getProduct());

            orderRepository.save(order);
        }

        cartRepository.deleteAll();
    }

  public List<Order> getMyOrders() {

    Authentication auth =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication();

    System.out.println("AUTH = " + auth);

    String email = auth.getName();

    System.out.println("EMAIL = " + email);

    Long userId =
            userRepository
                    .findByEmail(email)
                    .orElseThrow()
                    .getId();

    System.out.println("USER ID = " + userId);

    List<Order> orders =
            orderRepository.findByUserId(userId);

    System.out.println("ORDERS FOUND = " + orders.size());

    return orders;
}
}