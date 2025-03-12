import { Component } from '@angular/core';
import { ChartComponent } from '../chart/chart/chart.component';
import { CardComponent } from '../card/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
