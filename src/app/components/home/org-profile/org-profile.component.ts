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
// tslint:disable

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
  public OrgBranch: any;


  public AllBranches = [];


  ngOnInit() {

    this.updatePage().then(() => {
      this.branchForm = {
        orgProfileId: this.MyOrgProfile._id,
        branchName: '',
        qrCode: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    })

  }


  updatePage() {
    return new Promise((resolve, reject) => {
      this.orgProfileService.getOrgProfileByUserId().subscribe(
        data => {
          this.MyOrgProfile = data;
          this.orgBranchService.getAllByOrgProfileId(this.MyOrgProfile._id).subscribe(
            data => {
              this.AllBranches = data;
              console.log(data)
              resolve();
            },
            error => console.log('Error')
          );
      }, error => console.log('Error getting profile by user Id')
      );
    }
    )}

  addOrgBranch() {
    this.spinner.show();
    this.orgBranchService.createOrgBranch(this.branchForm).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notifyService.showSuccess('Branch added', 'Success');
          this.branchForm = {
            orgProfileId: this.MyOrgProfile._id,
            branchName: '',
            qrCode: '',
            createdAt: new Date(),
            updatedAt: new Date()
          };
          this.OrgBranch = data;
          console.log(this.OrgBranch);
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



  previewQrCode(qrCode) {
    this.spinner.show();
    this.pdfAction = 'preview';
    this.generatePDF(qrCode);
  }

  downLoadQrCode(qrCode) {
    this.spinner.show();
    this.pdfAction = 'download';
    this.generatePDF(qrCode);
  }


  printQrCode(qrCode) {
    this.spinner.show();
    this.pdfAction = 'print';
    this.generatePDF(qrCode);
  }


  async generatePDF(qrCode) {

    html2canvas(document.querySelector('#qrCode'), {scale: 2}).then(canvas => {

      let pdf = new jspdf('p', 'pt', 'a4');
      let img = new Image();

      pdf.addImage(img.src = qrCode, 'PNG', 200, 200, 200, 200);
      // pdf.addImage(canvas,'PNG', 200, 200, 200, 200);
      pdf.page = 1;
      pdf.setFontSize(12);
      pdf.text(260, 40, 'RATE ME ! ');
      pdf.text(180, 100, 'Scan the code to share your experience with us :)' );
      pdf.line(0, 675, 675, 675);
      pdf.text(250, 685, 'www.rateme.com');
      // pdf.text(190, 285, 'page ' + pdf.page);

      switch (this.pdfAction) {
        case 'preview': pdf.output('dataurlnewwindow'); this.spinner.hide(); break;
        case 'download': pdf.save(`${qrCode}.pdf`);
          this.spinner.hide(); this.notifyService.showInfo('Document downloading..', 'Info...');  break;
        // case 'share': this.sendInvoiceViaEmail(); break;
        case 'print': pdf.autoPrint(); this.notifyService.showInfo('Document on print', 'Info...'); this.spinner.hide(); break;
        default: pdf.output('dataurlnewwindow'); this.spinner.hide(); break;
      }
    })
  }






}
