import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SwiperOptions } from 'swiper/types';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [NgFor, NgClass, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  constructor(
    private _router: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this._router.params.subscribe((params) => {
      this.productId = +params['id'];
      if (this.productId) {
        this.productService
          .getProductById(this.productId)
          .subscribe((product) => {
            this.images = product.images;
            this.productName = product.name;
            this.description = product.description;
            this.price = product.price;
            this.quantity = product.quantity;
          });
      }
    });
  }
  images: string[] = [];
  productName: string = '';
  description: string = '';
  price: number = 0;
  quantity: number = 0;

  currentIndex = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
