import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find(p => p.id === id);
  }

  create(product: Product): Product {
    product.id = this.products.length + 1;
    this.products.push(product);
    return product;
  }

  update(id: number, product: Product): Product {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...product, id };
      return this.products[index];
    }
    return null;
  }

  delete(id: number): Product {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      const deletedProduct = this.products[index];
      this.products.splice(index, 1);
      return deletedProduct;
    }
    return null;
  }
}
