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
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetProductCategoryResponse>(this.productCategoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.productUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(url: string): Observable<Product[]> {
    return this.httpClient.get<GetProductResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductById(productId: number): Observable<Product> {
    const searchUrl = `${this.productUrl}/${productId}`;
    return this.httpClient.get<Product>(searchUrl);
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