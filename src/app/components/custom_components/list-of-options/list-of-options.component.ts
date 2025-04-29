import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuctionFormComponent } from '../../auction/auctionForm/auction-form/auction-form.component';

@Component({
  selector: 'app-list-of-options',
  imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterLink],
  templateUrl: './list-of-options.component.html',
  styleUrl: './list-of-options.component.css',
})
export class ListOfOptionsComponent {
  constructor(private _router: Router, private _dialog: MatDialog) {}
  @Input() ProductId: string = '';
  addToAuction() {
    const dialogRef = this._dialog.open(AuctionFormComponent, {
      data: {
        ProductId: this.ProductId,
        ProductName: 'اسم المنتج',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
