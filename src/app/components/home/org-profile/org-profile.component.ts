import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { OrgProfileService } from 'src/app/shared/services/orgProfile.service';
import { FileUploadService } from 'src/app/shared/services/fileUpload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from '../home.component';
import html2canvas from 'html2canvas';

import * as jspdf from 'jspdf';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrgBranchService} from '../../../shared/services/orgBranch.service';
import {error} from 'selenium-webdriver';

// declare let html2canvas: any;

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private orgProfileService: OrgProfileService,
    private orgBranchService: OrgBranchService,
    private fileUploadService: FileUploadService,
    private spinner: NgxSpinnerService,
    private homeComponent: HomeComponent
  ) { }


  public faTrash = faTrash;
  public MyProfile: any;
  public MyOrgProfile: any;
  public branchForm: any;
  public pdfAction;


  public AllBranches = [];


  ngOnInit() {

    this.myProfileFunction();

    this.updatePage();

  }

  myProfileFunction() {
    return new Promise((resolve, reject) => {
      this.orgProfileService.getOrgProfileByUserId().subscribe(
        data => {
          this.MyOrgProfile = data;
        }, error => console.log('Error getting profile by user Id')
      );
    }
    )}

  orgBranchForm(){
    return Promise.resolve(this.myProfileFunction()).then(() => {
      this.branchForm = {
        orgProfileId: this.MyOrgProfile._id,
        branchName: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }, error => console.log('org Branch Form error')
    );
  }

  updatePage() {
    return new Promise((resolve, reject) => {
      this.orgBranchService.getAllByOrgProfileId(this.MyOrgProfile._id).subscribe(
        data => {
          this.AllBranches = data;
        },
        error => console.log('Error')
      );
    }

    )}

  addOrgBranch() {
    this.spinner.show();
    this.orgBranchService.createOrgBranch(this.orgBranchForm()).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notifyService.showSuccess('Branch added', 'Success');
          this.orgBranchForm();
        });

      },
      error => {this.spinner.hide(); this.notifyService.showError('Could not create branch', 'Failed'); }
    );
  }

  // Remove Branch Function
  removeBranch(id) {
    this.spinner.show();
    this.orgBranchService.deleteOrgBranch(id).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notifyService.showSuccess('Branch Removed', 'Success');
        });

      },
      error => {this.spinner.hide(); this.notifyService.showError('Could not remove branch', 'Failed'); }
    );
  }


  previewQrCode() {
    this.spinner.show();
    this.pdfAction = 'preview';
    this.generatePDF();
  }

  downLoadQrCode() {
    this.spinner.show();
    this.pdfAction = 'download';
    this.generatePDF();
  }


  printQrCode() {
    this.spinner.show();
    this.pdfAction = 'print';
    this.generatePDF();
  }


  async generatePDF() {
    html2canvas(document.querySelector('#qrCode'), {scale: 2}).then(canvas => {
      let pdf = new jspdf('p', 'pt', 'a4');
      let img = new Image();

      pdf.addImage(img.src = this.MyProfile.qrCode, 'PNG', 200, 200, 200, 200);
      // pdf.addImage(canvas, 10, 45, 190, 210);
      pdf.page = 1;
      pdf.setFontSize(12);
      pdf.text(260, 40, 'RATE ME ! ');
      pdf.text(180, 100, 'Scan the code to share your experience with us :)' );
      pdf.line(0, 675, 675, 675);
      pdf.text(250, 685, 'www.rateme.com');
      // pdf.text(190, 285, 'page ' + pdf.page);

      switch (this.pdfAction) {
        case 'preview': pdf.output('dataurlnewwindow'); this.spinner.hide(); break;
        case 'download': pdf.save(`${this.MyProfile.qrCode}.pdf`);
          this.spinner.hide(); this.notifyService.showInfo('Document downloading..', 'Info...');  break;
        // case 'share': this.sendInvoiceViaEmail(); break;
        case 'print': pdf.autoPrint(); this.notifyService.showInfo('Document on print', 'Info...'); this.spinner.hide(); break;
        default: pdf.output('dataurlnewwindow'); this.spinner.hide(); break;
      }
    })
  }






}
