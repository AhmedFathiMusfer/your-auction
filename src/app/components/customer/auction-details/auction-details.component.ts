import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuctionService } from '../../../services/auction.service';
import { NgClass, NgFor } from '@angular/common';
import Bidder from '../../../Models/Auction/Bidder';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auction-details',
  imports: [NgFor, NgClass, RouterLink, FormsModule],
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css',
})
export class AuctionDetailsComponent implements OnInit {
  auctionId: number = 0;
  constructor(
    private _router: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    this._router.params.subscribe((params) => {
      this.auctionId = +params['id'];
      if (this.auctionId) {
        this.auctionService
          .datailsAuction(this.auctionId)
          .subscribe((auction) => {
            this.images = auction.imagesUrl;
            this.auctionId = auction.id;
            this.productName = auction.productName;
            this.description = auction.description;
            this.price = auction.price;
            this.quantity = auction.quantity;
          });
        this.auctionService.getBidders(this.auctionId).subscribe({
          next: (data) => {
            this.bidders = data;
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }
  images: string[] = [];
  productName: string = '';
  description: string = '';
  price: number = 0;
  quantity: number = 0;
  bidders: Bidder[] = [] as Bidder[];
  currentBidder: Bidder = {} as Bidder;

  currentIndex = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
  /*onSubmit() {
    newBidder: Bidder = {
      id: 0,
      name: 'newBidder',
      auctionId: this.auctionId,
      auctionValue: ,
    };


  }*/
}
