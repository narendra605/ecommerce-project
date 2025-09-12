package com.springboot.simpleWebapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.simpleWebapp.model.Product;
import com.springboot.simpleWebapp.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Create or Update product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by ID
    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }

    // Delete product
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }
    

}
