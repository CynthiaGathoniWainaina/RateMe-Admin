import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/shared/services/notification.service';
import {CustomerRatings} from '../../../shared/customer-rating-data';


@Component({
  selector: 'app-action-plans',
  templateUrl: './action-plans.component.html',
  styleUrls: ['./action-plans.component.css']
})
export class ActionPlansComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;


  public kanbanSectionStatus: boolean;


  constructor(
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    private notification: NotificationService,
    ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }


public cardBeingDraged: any;
public cardHoveredOnDrag: any;
public salesCatHoveredOnDrag: any;




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












  allowDrop(e) {
    e.preventDefault();
  }


  drag(e) {
    e.dataTransfer.setData('text', e.target.id);
    this.cardBeingDraged = e.target.id;
  }


  dragenter(e) {
    this.cardHoveredOnDrag = e.target.id;
  }


  dragleave(e) {
    // this.cardHoveredOnDrag = null;
  }


  drop(e) {
    e.preventDefault();
    this.cardHoveredOnDrag = null;
    this.salesCatHoveredOnDrag = null;
    let CardId = e.dataTransfer.getData('text');
    let TargetId = e.target.id;

    this.notification.showInfo(CardId, 'Card Moved')
    this.notification.showInfo(TargetId, 'Target place')

  }







}
