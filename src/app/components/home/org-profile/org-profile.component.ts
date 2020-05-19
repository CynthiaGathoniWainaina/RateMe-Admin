import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { OrgProfileService } from 'src/app/shared/services/orgProfile.service';
import { FileUploadService } from 'src/app/shared/services/fileUpload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { dev } from 'src/app/shared/dev/dev';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { HomeComponent } from '../home.component';
import html2canvas from 'html2canvas';

import * as jspdf from 'jspdf';
import {toBase64String} from '@angular/compiler/src/output/source_map';

// declare let html2canvas: any;

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private notifyService: NotificationService,
    private orgProfileService: OrgProfileService,
    private fileUploadService: FileUploadService,
    private spinner: NgxSpinnerService,
    private homeComponent: HomeComponent
  ) { }



  public MyProfile: any;
  public pdfAction;







  ngOnInit(): void {
    this.orgProfileService.getOrgProfileByUserId().subscribe(
      data => {
        this.MyProfile = data;
        console.log(this.MyProfile)
      }, error => console.log('Error getting profile by user Id')
    );
  }




  uploadLogo(logoFile) {
    this.spinner.show();
    const myLogo =  logoFile.target.files[0] as File;
    // tslint:disable-next-line: new-parens
    const formData = new FormData;
    formData.append('fileUploaded', myLogo, myLogo.name);

    this.fileUploadService.uploadOrgLogo(formData).subscribe(
      data => {
        this.fileUploadService.removeOrgLogo({name: this.MyProfile.logo.name}).subscribe();
        this.MyProfile.logo.url = `${dev.connect}${data.url}`,
        this.MyProfile.logo.name = data.name;
        this.orgProfileService.updateOrgProfile(this.MyProfile._id, this.MyProfile).subscribe(
          dataProfile => {
            this.homeComponent.myProfileFunction();
            this.MyProfile = dataProfile;
            this.spinner.hide();
            this.notifyService.showSuccess('Logo changed', 'Success');
          },
          error => {  this.spinner.hide(); this.notifyService.showInfo('Logo was not uploaded', 'Info'); }

        );
        }, error => { this.spinner.hide(); this.notifyService.showInfo('Logo was not uploaded', 'Info'); }
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
  // shareInvoice() {
  //   this.spinnerService.spinStart();
  //   this.pdfAction = 'share';
  //   this.generatePDF();
  // }

  printQrCdde() {
    this.spinner.show();
    this.pdfAction = 'print';
    this.generatePDF();
  }


  async generatePDF() {
    html2canvas(document.querySelector('#qrCode'), {scale: 2}).then(canvas => {
      let pdf = new jspdf('p', 'pt', 'a4');
      let img = new Image();

      pdf.addImage(img.src = this.MyProfile.qrCode, 'PNG', 200, 200, 200, 200);
      pdf.addImage(canvas, 10, 45, 190, 210);
      pdf.page = 1;
      pdf.setFontSize(12);
      pdf.text(260, 40, 'RATE ME ! ');
      pdf.text(180, 100, 'Scan the code to rate your experience with us :)' );
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
