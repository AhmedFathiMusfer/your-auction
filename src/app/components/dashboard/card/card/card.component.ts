import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import DashboardData from '../../../../Models/Dashboard/DashboardData';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  dashboardData: DashboardData = {} as DashboardData;
  constructor(private _dashboardService: DashboardService) {}
  ngOnInit(): void {
    this._dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        console.log(this.dashboardData);
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
      },
    });
  }
}
