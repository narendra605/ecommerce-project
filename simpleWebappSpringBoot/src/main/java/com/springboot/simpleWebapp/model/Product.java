package com.springboot.simpleWebapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "products")   // optional, otherwise Hibernate will name table 'product'
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;   // Primary Key

    private String name;
    private String description;
    private String brand;
    private BigDecimal price;
    private String category;

    @Temporal(TemporalType.DATE)
    private Date releaseDate;

    private boolean available;
    private int quantity;

    // --- Getters & Setters ---
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Date getReleaseDate() { return releaseDate; }
    public void setReleaseDate(Date releaseDate) { this.releaseDate = releaseDate; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", description=" + description +
               ", brand=" + brand + ", price=" + price + ", category=" + category +
               ", releaseDate=" + releaseDate + ", available=" + available +
               ", quantity=" + quantity + "]";
    }

    public Product() {}
}
