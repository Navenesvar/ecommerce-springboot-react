package com.project.ecommerce.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import com.project.ecommerce.dto.CartRequest;
import com.project.ecommerce.entity.Cart;
import com.project.ecommerce.entity.Product;
import com.project.ecommerce.entity.User;
import com.project.ecommerce.repository.CartRepository;
import com.project.ecommerce.repository.ProductRepository;
import com.project.ecommerce.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private CartRepository repository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CartService service;

    private Product product;
    private User user;
    private Cart cart;
    private CartRequest request;

    @BeforeEach
    void setUp() {

        product = new Product();
        product.setId(1L);
        product.setName("Laptop");

        user = new User();
        user.setId(10L);
        user.setEmail("test@gmail.com");

        request = new CartRequest();
        request.setProductId(1L);
        request.setQuantity(2);

        cart = new Cart();
        cart.setId(1L);
        cart.setUserId(10L);
        cart.setQuantity(2);
        cart.setProduct(product);
    }

    @Test
    void testAddToCart() {

        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(
                        "test@gmail.com",
                        null
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(auth);

        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        when(productRepository.findById(1L))
                .thenReturn(Optional.of(product));

        when(repository.save(any(Cart.class)))
                .thenReturn(cart);

        Cart savedCart =
                service.addToCart(request);

        assertNotNull(savedCart);
        assertEquals(10L, savedCart.getUserId());
        assertEquals(2, savedCart.getQuantity());
        assertEquals(product, savedCart.getProduct());

        verify(userRepository, times(1))
                .findByEmail("test@gmail.com");

        verify(productRepository, times(1))
                .findById(1L);

        verify(repository, times(1))
                .save(any(Cart.class));
    }

    @Test
    void testGetCartItems() {

        when(repository.findAll())
                .thenReturn(List.of(cart));

        List<Cart> carts =
                service.getCartItems();

        assertEquals(1, carts.size());

        verify(repository, times(1))
                .findAll();
    }

    @Test
    void testRemoveItem() {

        service.removeItem(1L);

        verify(repository, times(1))
                .deleteById(1L);
    }
}