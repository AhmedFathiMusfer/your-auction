import { DatePipe, NgClass, NgFor } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import IAuction from '../../../Models/Auction/IAuction';
import { AuctionService } from '../../../services/auction.service';
import { AuctionFormComponent } from '../auctionForm/auction-form/auction-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-auction',
  imports: [NgFor, NgClass, DatePipe],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css',
})
export class AuctionComponent implements OnInit {
  /* auctions: IAuction[] = [];
  constructor(
    private _auctionService: AuctionService //  private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this._auctionService.getAution().subscribe((data) => {
      this.auctions = data;
      console.log(data);
    });
  }
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
    console.log(this.isModalOpen);
  }

  closeModal() {
    this.isModalOpen = false;
  }
  /*openDialog() {
    const dialogRef = this.dialog.open(AuctionFormComponent);
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Auction Data:', result);
      }
    });
    /*  this.dialog.open(AuctionFormComponent, {
      width: '600px',
      disableClose: true, // يمنع الإغلاق عند الضغط خارج الـ Dialog
      autoFocus: true, // يجعل التركيز ينتقل داخل الـ Dialog
    });
  
  }*/
  constructor(private _auctionService: AuctionService) {}
  auctions: IAuction[] = []; // replace with real data from API
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages = 1;

  ngOnInit() {
    this.getData();
  }
  get totalPagesArray() {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.getData();
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getData();
    }
  }
  statusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500 text-white text-xl';
      case 'pending':
        return 'bg-blue-500 text-white text-xl';
      case 'cancelled':
        return 'bg-red-500 text-white text-xl';
      case 'completed':
        return 'bg-gray-300 text-black text-xl';
      default:
        return 'bg-gray-200 text-black text-xl';
    }
  }
  getData() {
    this._auctionService
      .getAuction(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (data) => {
          this.auctions = data.items;
          this.totalPages = data.totalPages;
        },
        error: (error) => {
          console.error('Error fetching auction data:', error);
        },
      });
  } //
}
