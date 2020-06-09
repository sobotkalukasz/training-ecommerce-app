import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api";
  private productUrl = `${this.baseUrl}/products`;
  private productCategoryUrl = `${this.baseUrl}/product-category`;
  
  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.productUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetProductResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
        return this.httpClient.get<GetProductCategoryResponse>(this.productCategoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetProductResponse {
  _embedded: {
    products: Product[];
  }
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  }
}