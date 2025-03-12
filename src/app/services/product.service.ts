import { Injectable } from '@angular/core';
import IProduct from '../Models/Product/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: IProduct[];
  constructor() {
    this.products = [
      {
        id: 1,
        name: 'كورلا',
        description: 'جديد',
        department: 'سيارات',
        seller_name: 'احمد مسفر',
        quantity: 2,
        price: 100,
      },
      {
        id: 2,
        name: 'صالون',
        description: 'جديد',
        department: 'سيارات',
        seller_name: 'احمد مسفر',
        quantity: 2,
        price: 100,
      },
      {
        id: 3,
        name: 'كورلا',
        description: 'جديد',
        department: 'سيارات',
        seller_name: 'احمد مسفر',
        quantity: 2,
        price: 100,
      },
      {
        id: 4,
        name: 'كورلا',
        description: 'جديد',
        department: 'سيارات',
        seller_name: 'احمد مسفر',
        quantity: 2,
        price: 100,
      },
      {
        id: 5,
        name: 'كورلا',
        description: 'جديد',
        department: 'سيارات',
        seller_name: 'احمد مسفر',
        quantity: 2,
        price: 100,
      },
    ];
  }
  getProducts(): IProduct[] {
    return this.products;
  }
}
