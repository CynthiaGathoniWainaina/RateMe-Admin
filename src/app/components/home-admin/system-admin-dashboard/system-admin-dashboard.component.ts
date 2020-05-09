import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-system-admin-dashboard',
  templateUrl: './system-admin-dashboard.component.html',
  styleUrls: ['./system-admin-dashboard.component.css']
})
export class SystemAdminDashboardComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;


  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Revenue history' },
  ];

  lineChartLabels: Label[] = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{

        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }]
  }};

  lineChartColors: Color[] = [
    {
      borderColor: '#2D0140',
      backgroundColor: '#FFFFFF',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
        barThickness: 6,
        maxBarThickness: 8,
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      barThickness: 6,
      maxBarThickness: 8,
    }
  };
  public barChartLabels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data : ['150000', '150000', '200000', '250000', '300000', '350000', '400000', '450000'], label: 'Forecast'},
    {data : ['200000', '300000', '350000', '400000', '450000', '500000', '600000', '700000'], label: 'Actual'},
    {data : ['200000', '300000', '350000', '400000', '450000', '500000', '600000', '700000'], label: 'Actual'},
    {data : ['200000', '300000', '350000', '400000', '450000', '500000', '600000', '700000'], label: 'Actual'}
  ];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: ['#264d59','#d46c4e','#f9e07f','2D0140',],
      border: 'none',

      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff'
    }];


  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  ngOnInit() {
  }

}
