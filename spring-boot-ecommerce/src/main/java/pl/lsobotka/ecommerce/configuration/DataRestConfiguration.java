package pl.lsobotka.ecommerce.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import pl.lsobotka.ecommerce.model.Product;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        HttpMethod[] unsuportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

        // disable HTTP methods for Product model - read only
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((model, httpMethods) -> httpMethods.disable(unsuportedActions))
                .withCollectionExposure((model, httpMethods) -> httpMethods.disable(unsuportedActions));

        // disable HTTP methods for ProductCategory model - read only
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((model, httpMethods) -> httpMethods.disable(unsuportedActions))
                .withCollectionExposure((model, httpMethods) -> httpMethods.disable(unsuportedActions));
    }
}
