import { CommonModule } from '@angular/common';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Chart, ChartConfiguration, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements AfterViewInit, OnInit {
  @ViewChild('lineChart') lineChartCanvas!: ElementRef;
  @ViewChild('auctionChart') auctionChart!: ElementRef<HTMLCanvasElement>;
  chart: any;

  ngAfterViewInit() {
    new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'الأحد',
          'الإثنين',
          'الثلاثاء',
          'الأربعاء',
          'الخميس',
          'الجمعة',
          'السبت',
        ],
        datasets: [
          {
            label: 'الأرباح اليومية',
            data: [120, 180, 150, 220, 170, 240, 200],
            borderColor: '#2D68FE',
            backgroundColor: 'hsla(223, 99.10%, 58.60%, 0.20) ',
            borderWidth: 2,
            fill: true,
            tension: 0.4, //#2d68fe hsla(223, 99.10%, 58.60%, 0.26)  لجعل الخط منحنيًا
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#4B5563',
              font: {
                size: 14,
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#6B7280',
            },
          },
          y: {
            ticks: {
              color: '#6B7280',
              stepSize: 50,
            },
            grid: {
              tickBorderDash: [8, 4],
            },
          },
        },
      },
    });
  }
  ngOnInit() {
    setTimeout(() => {
      this.createChart();
    }, 0);
  }
  createChart() {
    if (this.chart) {
      this.chart.destroy(); // تدمير المخطط السابق إذا كان موجودًا
    }

    this.chart = new Chart(this.auctionChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'مزاد السيارات',
          'مزاد الإلكترونيات',
          'مزاد العقارات',
          'مزاد التحف',
          'مزاد الأثاث',
        ],
        datasets: [
          {
            label: 'عدد المبيعات',
            data: [150, 120, 100, 90, 80], // عدد المبيعات لكل مزاد
            backgroundColor: [
              'hsla(223, 99.10%, 58.60%, 0.75)E',
              'hsla(216, 98.60%, 27.80%, 0.75)',
              'hsla(223, 100.00%, 36.30%, 0.55)',
              'hsla(224, 91.70%, 14.10%, 0.47)',
              'hsla(223, 100.00%, 50.80%, 0.23)',
            ],
            borderColor: 'hsla(216, 93.10%, 45.50%, 0.75)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, // إخفاء العنوان
          },
        },
        scales: {
          x: {
            ticks: { color: '#6B7280' },
            grid: { tickBorderDash: [5, 5], color: 'rgba(0, 0, 0, 0.1)' },
          },
          y: {
            ticks: { color: '#6B7280', stepSize: 10 },
            grid: { tickBorderDash: [5, 5], color: 'rgba(0, 0, 0, 0.1)' },
          },
        },
      },
    });
  }
}
