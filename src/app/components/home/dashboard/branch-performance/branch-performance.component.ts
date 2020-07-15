import { Component, OnInit } from '@angular/core';
import {OrgProfileService} from '../../../../shared/services/orgProfile.service';
import {StatsService} from '../../../../shared/services/stats.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {OrgBranchService} from '../../../../shared/services/orgBranch.service';


@Component({
  selector: 'app-branch-performance',
  templateUrl: './branch-performance.component.html',
  styleUrls: ['./branch-performance.component.css']
})
export class BranchPerformanceComponent implements OnInit {

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private orgProfileService: OrgProfileService,
    private orgBranchService: OrgBranchService,
    private statsService: StatsService,
    private spinner: NgxSpinnerService
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
public barChartLabels = ['Aga khan Walk', 'Kimathi', 'Lifestyle', 'Ngong Rd'];
public barChartType = 'bar';
public barChartLegend = false;
public barChartData = [
  {data : ['35', '40', '23', '63']},
];

public chartColors: Array<any> = [
  { // first color
    backgroundColor: ['blue', '#C9E5FF', 'Orange', '#C9E5FF', 'green', '#C9E5FF', 'red', '#C9E5FF'],
    border: 'none',

    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff'
  }];



  public AverageSatRateByOrgBranch: any;
  public TotalNoOfRatingsByOrgBranch: any;
  public MostFreqSelectedEmojiByOrgBranch = [];
  public AllIssues = [];


  public MyOrgProfile: any;
  public MyOrgBranch: any;

  public AllBranches = [];



  ngOnInit() {
    this.spinner.show();

    this.orgProfileService.getOrgProfileByUserId().subscribe(
      data => {
        this.MyOrgProfile = data;
        this.fetchStats().then(() => { this.spinner.hide(); });
      }, error => console.log('Error getting profile by user Id')
    );

    this.updatePage();

  }

  updatePage() {
    return new Promise((resolve, reject) => {
        this.orgProfileService.getOrgProfileByUserId().subscribe(
          data => {
            this.MyOrgProfile = data;
            this.orgBranchService.getAllByOrgProfileId(this.MyOrgProfile._id).subscribe(
              data => {
                this.AllBranches = data;
                resolve();
              },
              error => console.log('Error')
            );
          }, error => console.log('Error getting profile by user Id')
        );
      }
    )}



fetchStats() {

  return new Promise((resolve, reject) => {

    this.statsService.totalNumberOfRatingsByOrgBranch({orgBranchId: x => x._id == this.AllBranches}[0]).subscribe(
      dataTotalNoOfRatingsByOrgBranch => {
        this.TotalNoOfRatingsByOrgBranch = (dataTotalNoOfRatingsByOrgBranch.totalNumberOfRating);
      }, error => console.log('Error fetching Stats')
    );

    this.statsService.averageSatRateByOrgBranch({orgBranchId: x => x._id == this.AllBranches}[0]).subscribe(
      dataAverageSatRateByOrg => {
        this.AverageSatRateByOrgBranch = (dataAverageSatRateByOrg.averageRating).toFixed(0);
      }, error => console.log('Error fetching Stats')
    );

    this.statsService.mostFreqSelectedEmojiByOrgBranch({orgBranchId: x => x._id == this.AllBranches}[0]).subscribe(
      dataMostFreqSelectedEmojiByOrgBranch=> {
        this.MostFreqSelectedEmojiByOrgBranch = dataMostFreqSelectedEmojiByOrgBranch;
        resolve();
      },
      error => console.log('Error fetching Stats')
    );

    this.orgProfileService.getOrgProfileByUserId().subscribe(
      data => {
        this.MyOrgProfile = data;
        this.statsService.topIssuesByOrgBranch({orgProfileId: this.MyOrgProfile._id}).subscribe(
          dataTopIssuesByOrgBranch => {
            this.AllIssues = dataTopIssuesByOrgBranch;
            console.log(this.AllIssues)
            resolve();
          },
          error => console.log('Error fetching Stats')
        );
      }, error => console.log('Error getting profile by user Id')
    );


  });
}}
