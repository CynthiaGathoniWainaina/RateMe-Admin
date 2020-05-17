import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { OrgProfileService } from 'src/app/shared/services/orgProfile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {




  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
    ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }




hoveredDate: NgbDate | null = null;

fromDate: NgbDate | null;
toDate: NgbDate | null;


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
  {data : ['200000', '300000', '350000', '400000', '450000', '500000', '600000', '700000'], label: 'Actual'}
];

public chartColors: Array<any> = [
  { // first color
    backgroundColor: ['blue', '#C9E5FF', 'Orange', '#C9E5FF', 'green', '#C9E5FF', 'red', '#C9E5FF'],
    border: 'none',

    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff'
  }];


public MyProfile: any;






  ngOnInit() {

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













}
