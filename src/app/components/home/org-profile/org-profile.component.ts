import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { OrgProfileService } from 'src/app/shared/services/orgProfile.service';
import { FileUploadService } from 'src/app/shared/services/fileUpload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { dev } from 'src/app/shared/dev/dev';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeComponent } from '../home.component';

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






  ngOnInit(): void {
    this.orgProfileService.getOrgProfileByUserId().subscribe(
      data => {
        this.MyProfile = data;
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

}
