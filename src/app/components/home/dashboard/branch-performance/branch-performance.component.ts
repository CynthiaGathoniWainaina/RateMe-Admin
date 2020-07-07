import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch-performance',
  templateUrl: './branch-performance.component.html',
  styleUrls: ['./branch-performance.component.css']
})
export class BranchPerformanceComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
  }

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{
        barThickness: 6,
        maxBarThickness: 8,
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      barThickness: 6,
      maxBarThickness: 8,
    }
  };
  public barChartLabels = ['Aga khan Walk', 'Kimathi', 'Lifestyle', 'Ngong Rd', 'Mombasa', 'Eldoret', 'Nakuru'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data : ['35', '40', '23', '63', '39', '77', '55', '80']},
  ];

  public chartColors: Array<any> = [
    { // first color
      backgroundColor: ['blue', '#C9E5FF', 'Orange', '#C9E5FF', 'green', '#C9E5FF', 'red', '#C9E5FF'],
      border: 'none',

      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff'
    }];

}
