import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-auction-form-component',
  imports: [MatDialogModule],
  standalone: true,
  templateUrl: './auction-form-component.component.html',
  styleUrl: './auction-form-component.component.css',
})
export class AuctionFormComponent {
  auctionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AuctionFormComponent>,
    private fb: FormBuilder
  ) {
    this.auctionForm = this.fb.group({
      productName: [''],
      description: [''],
      sellerName: [''],
      email: [''],
      phone: [''],
      quantity: [''],
      price: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.auctionForm.valid) {
      console.log('Form Data:', this.auctionForm.value);
      this.dialogRef.close(this.auctionForm.value);
    }
  }
}
