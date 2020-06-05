package pl.lsobotka.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lsobotka.ecommerce.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
