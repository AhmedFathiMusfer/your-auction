import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { AuctionService } from '../../../../services/auction.service';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

import IAddAuction from '../../../../Models/Auction/IAddAuction';

@Component({
  selector: 'app-auction-form-component',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './auction-form.component.html',
  styleUrl: './auction-form.component.css',
})
export class AuctionFormComponent {
  timeUnits: { key: number; value: string }[] = [
    { key: 1, value: 'دقيقة' },
    { key: 2, value: 'ساعة' },
    { key: 3, value: 'يوم' },
    { key: 4, value: 'اسبوع' },
    { key: 5, value: 'شهر' },
  ];
  currentDate: Date;
  valueOfInputNumber: number = 1;
  selectedTimeUnitValue: number = 1;
  errorMessage: string = '';
  productName: string = '';
  productId: string = '';

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AuctionFormComponent>,
    private _auctionServerice: AuctionService
  ) {
    this.productName = data.ProductName;
    this.productId = data.ProductId;
    this.currentDate = new Date();
  }
  Add() {
    if (this.valueOfInputNumber <= 0) {
      this.errorMessage = 'الرجاء ادخال قيمة صحيحة';
      return;
    }
    var newDate = new Date(this.currentDate);

    switch (+this.selectedTimeUnitValue) {
      case 1: // دقيقة
        newDate.setMinutes(newDate.getMinutes() + this.valueOfInputNumber);
        break;
      case 2: // ساعة
        newDate.setHours(newDate.getHours() + this.valueOfInputNumber);
        break;
      case 3: // يوم
        newDate.setDate(newDate.getDate() + this.valueOfInputNumber);
        break;
      case 4: // أسبوع
        newDate.setDate(newDate.getDate() + this.valueOfInputNumber * 7);
        break;
      case 5: // شهر
        newDate.setMonth(newDate.getMonth() + this.valueOfInputNumber);
        break;
      default:
        console.error('وحدة الوقت غير صحيحة');
        break;
    }

    const auction: IAddAuction = {
      productId: +this.productId,
      endDate: newDate,
    };
    console.log(auction);

    this._auctionServerice.addAuction(auction).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close(res);
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء إضافة المزاد';
      },
    });
  }
  close() {
    this.dialogRef.close();
  }
}
