import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { IndustryService } from 'src/app/shared/services/industry.service';
import { FileUploadService } from 'src/app/shared/services/fileUpload.service';
import { dev } from 'src/app/shared/dev/dev';
import { OrgProfileService } from 'src/app/shared/services/orgProfile.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
// tslint:disable: prefer-const
// tslint:disable: object-literal-shorthand
// tslint:disable: max-line-length
// tslint:disable: new-parens






  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orgProfileService: OrgProfileService,
    private industryService: IndustryService,
    private fileUploadService: FileUploadService,
    private notification: NotificationService
  ) { }






public signUpForm: FormGroup;
public AllIndustryTypes = [];
public previewLogo = null;
public myLogo;






ngOnInit() {
  this.signUpForm = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email]],
    location: ['', Validators.required],
    businessName: ['', Validators.required],
    industryId: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    logo: {name: '', url: ''}
  });

  this.updatePage();
  this.addIndustryTypes();
}






get formSignUp() {return this.signUpForm.controls; }






updatePage() {
  this.industryService.getAllIndustries().subscribe(
    dataIndustry => {
      this.AllIndustryTypes = dataIndustry;
    },
    error => console.log('Error getting all Industry Types')
  );
}






// Delete this function when there is a form for inputing industry types
addIndustryTypes() {

  this.industryService.getAllIndustries().subscribe(
    dataIndustry => {
      if (dataIndustry.length === 0) {
        let industryOne = {
          industryName: 'Food & Beverage Industry',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        this.industryService.createIndustry(industryOne).subscribe(
          dataOne => {
            let industryTwo = {
              industryName: 'Health Industry',
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            this.industryService.createIndustry(industryTwo).subscribe(
              dataTwo => {
                this.updatePage();
              },
              error => console.log('Error creating industry one')
            );

          },
          error => console.log('Error creating industry one')
        );

      }
    },
    error => console.log('Error getting all Industry Types')
  );
}






uploadLogo(logoFile) {
  this.myLogo =  logoFile.target.files[0] as File;
  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    this.previewLogo = fileReader.result;
  },
  fileReader.readAsDataURL(this.myLogo);
}






removeLogo() {
  this.previewLogo = null;
}






onSubmit() {
  if (this.previewLogo) {
    const formData = new FormData;
    formData.append('fileUploaded', this.myLogo, this.myLogo.name);
    this.fileUploadService.uploadOrgLogo(formData).subscribe(
      data => {
        this.signUpForm.value.logo.url = `${dev.connect}static/images/orgProfileImages/${data.imageName}`;
        this.signUpForm.value.logo.name = data.imageName;
        this.registerUser();
      },
      error => {
        this.notification.showInfo('Logo was not uploaded', 'Info');
        // in case the logo is not uploaded successfuly, registration continues,
        // if you want to stop registration, do not call the registerUser function
        this.registerUser();
      }
    );
  } else {
    this.registerUser();
  }

}






registerUser() {
  let newUserData = {
    password: this.signUpForm.value.password,
    email: this.signUpForm.value.email,
    userType: 'orgAdmin',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  this.userService.registerUser(newUserData).subscribe(
    data => {
      this.createOrgProfile(data._id);
    },
    error => this.notification.showWarning(error.error.message, 'Failed')
  );
}






createOrgProfile(id) {
  let newOrgProfile = {
    userId: id,
    businessName: this.signUpForm.value.businessName,
    industryId: this.signUpForm.value.industryId,
    logo: {name: this.signUpForm.value.logo.name, url: this.signUpForm.value.logo.url},
    location: this.signUpForm.value.location,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  this.orgProfileService.createOrgProfile(newOrgProfile).subscribe(
    data => {
      this.router.navigate(['/home']);
    },
    error => console.log('could not create org profile')
  );
}






}// end of main class
