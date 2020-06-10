package pl.lsobotka.ecommerce.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import pl.lsobotka.ecommerce.model.Product;
import pl.lsobotka.ecommerce.model.ProductCategory;

import java.util.Arrays;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {

    private static HttpMethod[] unsuportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        Class[] classes = {Product.class, ProductCategory.class};
        Arrays.stream(classes).forEach(clazz -> disableUnsuportedActions(config, clazz));
        config.exposeIdsFor(classes);
    }

    private void disableUnsuportedActions(RepositoryRestConfiguration config, Class clazz) {
        config.getExposureConfiguration()
                .forDomainType(clazz)
                .withItemExposure((model, httpMethods) -> httpMethods.disable(unsuportedActions))
                .withCollectionExposure((model, httpMethods) -> httpMethods.disable(unsuportedActions));
    }
}
