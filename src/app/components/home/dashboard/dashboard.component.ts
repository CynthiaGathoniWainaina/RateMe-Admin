import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }]
    }
  };
  public barChartLabels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data : ['150000', '150000', '200000', '250000', '300000', '350000', '400000', '450000'], label: 'Forecast'},
    {data : ['200000', '300000', '350000', '400000', '450000', '500000', '600000', '700000'], label: 'Actual'}
  ];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: ['blue', '#C9E5FF', 'Orange', '#C9E5FF', 'green', '#C9E5FF', 'red', '#C9E5FF'],
      border: 'none',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff'
    }];

  constructor() { }

  ngOnInit() {
  }

}
