import { Component, OnInit } from '@angular/core';
import IProduct from '../../../Models/Product/IProduct';
import { ProductService } from '../../../services/product.service';
import { NgFor } from '@angular/common';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-product',
  imports: [NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: IProduct[];
  filteredProducts: IProduct[];
  constructor(
    private _productService: ProductService,
    private _searchService: SearchService
  ) {
    this.products = _productService.getProducts();
    this.filteredProducts = this.products;
  }
  ngOnInit(): void {
    this._searchService.currentSearch.subscribe((term) => {
      this.filteredProducts = this.products.filter((p) =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
    });
    console.log(this.filteredProducts);
  }
}
