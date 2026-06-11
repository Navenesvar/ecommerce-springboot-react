package com.project.ecommerce.service;

import com.project.ecommerce.entity.Product;
import com.project.ecommerce.repository.ProductRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    private Product product;

    @BeforeEach
    void setUp() {

        product = new Product();

        product.setId(1L);
        product.setName("Laptop");
        product.setDescription("Gaming Laptop");
        product.setPrice(75000.0);
        product.setImageUrl("image.jpg");
    }

    @Test
    void testSaveProduct() {

        when(repository.save(product))
                .thenReturn(product);

        Product savedProduct =
                service.save(product);

        assertNotNull(savedProduct);
        assertEquals("Laptop",
                savedProduct.getName());

        verify(repository, times(1))
                .save(product);
    }

    @Test
    void testGetAllProducts() {

        List<Product> products =
                Arrays.asList(product);

        when(repository.findAll())
                .thenReturn(products);

        List<Product> result =
                service.getAll();

        assertEquals(1, result.size());

        verify(repository, times(1))
                .findAll();
    }

    @Test
    void testGetProductById() {

        when(repository.findById(1L))
                .thenReturn(Optional.of(product));

        Optional<Product> result =
                service.getById(1L);

        assertTrue(result.isPresent());

        assertEquals(
                "Laptop",
                result.get().getName()
        );
    }

    @Test
    void testUpdateProduct() {

        Product updatedProduct =
                new Product();

        updatedProduct.setName("MacBook");
        updatedProduct.setDescription("Apple Laptop");
        updatedProduct.setPrice(120000.0);
        updatedProduct.setImageUrl("mac.jpg");

        when(repository.findById(1L))
                .thenReturn(Optional.of(product));

        when(repository.save(any(Product.class)))
                .thenAnswer(
                        invocation ->
                                invocation.getArgument(0)
                );

        Product result =
                service.update(
                        1L,
                        updatedProduct
                );

        assertEquals(
                "MacBook",
                result.getName()
        );

        assertEquals(
                120000.0,
                result.getPrice()
        );

        verify(repository)
                .save(any(Product.class));
    }

    @Test
    void testDeleteProduct() {

        doNothing()
                .when(repository)
                .deleteById(1L);

        service.delete(1L);

        verify(repository, times(1))
                .deleteById(1L);
    }
}