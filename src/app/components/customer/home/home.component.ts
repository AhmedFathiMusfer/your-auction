import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../services/auction.service';
import IAuction from '../../../Models/Auction/IAuction';
import { Router } from '@angular/router';
import { AuctionCardComponent } from '../auction-card/auction-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AuctionCardComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  auctions: IAuction[] = [] as IAuction[];
  constructor(
    private auctionService: AuctionService, // Assuming you have an AuctionService to fetch auctions
    private router: Router // Assuming you have a Router for navigation
  ) {}
  ngOnInit(): void {
    this.auctionService.getAuction(1, 2).subscribe({
      next: (response) => {
        this.auctions = response.items;
      },
      error: (error) => {
        console.error('Error fetching auctions:', error);
      },
    });
  }
}
