import { Component, OnInit } from '@angular/core';
import IProduct from '../../../Models/Product/IProduct';
import { ProductService } from '../../../services/product.service';
import { NgFor } from '@angular/common';
import { SearchService } from '../../../services/search.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { RouterLink } from '@angular/router';
import { ListOfOptionsComponent } from '../../custom_components/list-of-options/list-of-options.component';

@Component({
  selector: 'app-product',
  imports: [NgFor, ProductFormComponent, RouterLink, ListOfOptionsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  addtoAuction(arg0: number) {}
  products: IProduct[];
  filteredProducts: IProduct[];
  isModalOpen = false;
  productId: any = '';
  typeForm: string = 'add';
  constructor(
    private _productService: ProductService,
    private _searchService: SearchService
  ) {
    this.products = [];
    this.filteredProducts = this.products;
  }
  ngOnInit(): void {
    this.getProducts();
    this.filterProducts();
  }
  filterProducts() {
    this._searchService.currentSearch.subscribe((term) => {
      //console.log(term);
      this.filteredProducts = this.products.filter((p) =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
    });
  }
  openModal() {
    this.isModalOpen = true;
    console.log(this.isModalOpen);
  }
  getProducts() {
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = this.products;
        console.log(data);
      },
    });
  }
  closeModal() {
    this.isModalOpen = false;
    this.getProducts();
  }
  updateProduct(id: any) {
    this.isModalOpen = true;
    this.typeForm = 'update';
    this.productId = id;
  }
}
