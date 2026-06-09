package com.project.ecommerce.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.project.ecommerce.dto.CartRequest;
import com.project.ecommerce.entity.Cart;
import com.project.ecommerce.entity.Product;
import com.project.ecommerce.repository.CartRepository;
import com.project.ecommerce.repository.ProductRepository;
import com.project.ecommerce.repository.UserRepository;

@Service
public class CartService {

    private final CartRepository repository;
    private final ProductRepository productRepository;
private final UserRepository userRepository;

public CartService(
        CartRepository repository,
        ProductRepository productRepository,
        UserRepository userRepository) {

    this.repository = repository;
    this.productRepository = productRepository;
    this.userRepository = userRepository;
}

    public Cart addToCart(CartRequest request) {

    Authentication auth =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication();

    String email = auth.getName();

    Long userId =
            userRepository
                    .findByEmail(email)
                    .orElseThrow()
                    .getId();

    Product product =
            productRepository
                    .findById(request.getProductId())
                    .orElseThrow();

    Cart cart = new Cart();

    cart.setUserId(userId);
    cart.setQuantity(request.getQuantity());
    cart.setProduct(product);

    return repository.save(cart);
}
    public List<Cart> getCartItems() {
        return repository.findAll();
    }

    public void removeItem(Long id) {
        repository.deleteById(id);
    }
}