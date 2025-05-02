import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { toZonedTime } from 'date-fns-tz';
import IAuction from '../../../Models/Auction/IAuction';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { AuctionService } from '../../../services/auction.service';
import { PaymentService } from '../../../services/payment.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-auction-card',
  imports: [],
  templateUrl: './auction-card.component.html',
  styleUrl: './auction-card.component.css',
})
export class AuctionCardComponent implements OnInit, OnDestroy {
  @Input() auction!: IAuction;

  timeLeft: string = '';
  private intervalId: any;
  constructor(
    private _auctionService: AuctionService,
    private _paymentService: PaymentService,
    private _route: Router
  ) {}
  ngOnInit() {
    this.updateCountdown();
    console.log(this.auction.productName + this.auction.endDate);
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const end = this.tolocal(this.auction.endDate);

    const distance = end - now;

    if (distance < 0) {
      this.timeLeft = 'Auction ended';
      /* this._auctionService.completeAuction(this.auction.id).subscribe({
        next: () => {
          console.log('dj');
        },
      });*/
      clearInterval(this.intervalId);
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.timeLeft = `${days} days ${hours}h ${minutes}m ${seconds}s`;
  }
  moveToPayment() {
    this._paymentService.getPaymentStatus().subscribe({
      next: (data) => {
        var hasPayment = data;
        if (hasPayment) {
          this._route.navigate(['/AuctionDetails', this.auction.id]);
        } else {
          this._route.navigate(['/Payment']);
        }
      },
    });
  }
  tolocal(endDate: Date): number {
    const local = new Date().getHours();
    const utc = new Date().getUTCHours();
    const TimezoneOffse = new Date().getTimezoneOffset() * 60 * 1000;
    const endDateInLocal =
      local > utc
        ? new Date(endDate).getTime() + TimezoneOffse
        : new Date(endDate).getTime() - TimezoneOffse;
    return endDateInLocal;
  }
}
