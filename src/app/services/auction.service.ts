import { Injectable } from '@angular/core';
import IAuction from '../Models/Auction/IAuction';
import { DatasetController } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  auctions: IAuction[];
  date: Date = new Date(Date.now());
  constructor() {
    this.auctions = [
      {
        id: 1,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'جاري',
      },
      {
        id: 2,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'جاري',
      },
      {
        id: 3,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'قادم',
      },
      {
        id: 4,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'منتهي',
      },
      {
        id: 5,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'منتهي',
      },
    ];
  }
  getAution(): IAuction[] {
    return this.auctions;
  }
}
