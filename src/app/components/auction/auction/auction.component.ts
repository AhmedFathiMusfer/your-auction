import { DatePipe, NgClass, NgFor } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import IAuction from '../../../Models/Auction/IAuction';
import { AuctionService } from '../../../services/auction.service';
import { AuctionFormComponent } from '../auctionForm/auction-form/auction-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-auction',
  imports: [NgFor, NgClass, DatePipe, AuctionFormComponent],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css',
})
export class AuctionComponent {
  auctions: IAuction[];
  constructor(
    private _auctionService: AuctionService,
    private dialog: MatDialog
  ) {
    this.auctions = _auctionService.getAution();
  }
  openDialog() {
    /* const dialogRef = this.dialog.open(AuctionFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Auction Data:', result);
      }
    });*/
    this.dialog.open(AuctionFormComponent, {
      width: '600px',
      disableClose: true, // يمنع الإغلاق عند الضغط خارج الـ Dialog
      autoFocus: true, // يجعل التركيز ينتقل داخل الـ Dialog
    });
  }
}
