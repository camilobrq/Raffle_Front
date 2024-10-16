import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }

  selectedValue: string = '';
  months: any;
  chart1: any;
  chart2: any;

  ngOnInit() {
    this.initializeMonths();
    this.initializeCharts();
  }

  initializeMonths() {
    this.months = [
      { value: 'January', viewValue: 'January' },
      { value: 'February', viewValue: 'February' },
      { value: 'March', viewValue: 'March' },
    ];
  }

  initializeCharts() {
    this.chart1 = document.getElementById('Chart-impact');
    Chart.register(...registerables);
    this.loadChart1();
    this.chart1 = document.getElementById('Chart-type');
    Chart.register(...registerables);
    this.loadChart2();
  }

  loadChart1(): void {
    new Chart(this.chart1, {
      type: 'line',
      data: {
        datasets: [
          {
            data: [10, 20, 30, 40, 50, 60, 100, 20, 10, 10, 20, 0],
            label: 'Service',
            backgroundColor: '#1b2d10',
          },
        ],
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
      },
    });
  }

  loadChart2(): void {
    new Chart(this.chart1, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            label: 'Priority',
            backgroundColor: ['#1b2d10', '#617458', '#dfedd6'],
          },
        ],
        labels: ['High', 'Half', 'Low'],
      },
    });
  }

  navigate() {
    this.router.navigate(['/Dashboard/SearchService']);
  }
}
