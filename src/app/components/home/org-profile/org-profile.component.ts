import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { OrgProfileService } from 'src/app/shared/services/orgProfile.service';
import { FileUploadService } from 'src/app/shared/services/fileUpload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { dev } from 'src/app/shared/dev/dev';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from '../home.component';
import html2canvas from 'html2canvas';

import * as jspdf from 'jspdf';
import {toBase64String} from '@angular/compiler/src/output/source_map';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrgBranchService} from '../../../shared/services/orgBranch.service';

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
  public User: any;
  public branchForm: any;
  public pdfAction;
  public updateOrgProfileForm: FormGroup;
  public previewLogo = null;
  public myLogo;

  public AllBranches = [];




  ngOnInit(): void {
    this.updatePage();

    this.orgProfileService.getOrgProfileByUserId().subscribe(
      data => {
        this.MyProfile = data;
        console.log(this.MyProfile)
      }, error => console.log('Error getting profile by user Id')
    );


    this.updateOrgProfileForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      location: [''],
      businessName: [''],
      password: ['', [Validators.minLength(4)]],
      logo: {name: '', url: ''}
    });

    this.branchForm = {
      branchName: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };


  }

  updatePage() {
    return new Promise((resolve, reject) => {
      this.orgBranchService.getAllOrgBranches().subscribe(
        data => {
          this.AllBranches = data;
        },
        error => console.log('Error')
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
            branchName: '',
            createdAt: new Date(),
            updatedAt: new Date()
          };
        });

      },
      error => {this.spinner.hide(); this.notifyService.showError('Coud not create branch', 'Failed'); }
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


  get formUpdateProfle() {return this.updateOrgProfileForm.controls; }

  updateOrgProfile() {
    let updatedOrgProfile = {
      businessName: this.updateOrgProfileForm.value.businessName,
      email: this.updateOrgProfileForm.value.email,
      logo: {name: this.updateOrgProfileForm.value.logo.name, url: this.updateOrgProfileForm.value.logo.url},
      location: this.updateOrgProfileForm.value.location,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orgProfileService.updateOrgProfile(this.MyProfile._id, updatedOrgProfile).subscribe(
      data => {
        this.updateUser();
      },
      error => {this.spinner.hide(); this.notifyService.showWarning('could not update org profile', 'Failed'); }
    );
  }

  onSubmit() {
    if (this.previewLogo) {
      const formData = new FormData;
      formData.append('fileUploaded', this.myLogo, this.myLogo.name);
      this.fileUploadService.uploadOrgLogo(formData).subscribe(
        data => {
          this.updateOrgProfile();
          this.updateUser();
          this.spinner.show();

        }, error => {
          this.notifyService.showInfo('Logo was not uploaded', 'Info');
          this.updateUser();
        }
      );
    } else {
      this.updateUser();
    }

  }


  updateUser() {
    this.spinner.show();
    this.userService.updateUsers(this.User._id, this.updateOrgProfile).subscribe(
      data => {
        localStorage.setItem('UpdatedLoggedInUser', data.email);
        this.notifyService.showSuccess('User updated', 'Success');
          },
         error => {
           this.notifyService.showError(error.error.message, 'Could not update user');
           this.spinner.hide();
         },
         )

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

  removeLogo() {
    this.previewLogo = null;
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
