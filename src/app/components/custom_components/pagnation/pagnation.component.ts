import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagnation',
  imports: [],
  templateUrl: './pagnation.component.html',
  styleUrl: './pagnation.component.css',
})
export class PagnationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 5;
  @Input() pageNumbers: number[] = [];
  @Input() pageNumbersToShow: number = 5;
}
