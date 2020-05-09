import {AfterViewInit, Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { IndustryService } from 'src/app/shared/services/industry.service';
import { FileUploadService } from 'src/app/shared/services/fileUpload.service';
import { dev } from 'src/app/shared/dev/dev';
import { OrgProfileService } from 'src/app/shared/services/orgProfile.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import {} from "googlemaps";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, AfterViewInit {
// tslint:disable
// tslint:disable: object-literal-shorthand
// tslint:disable: max-line-length
// tslint:disable: new-parens

  @Input() addressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;


  address: Object;
  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  phone: string;



  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orgProfileService: OrgProfileService,
    private industryService: IndustryService,
    private fileUploadService: FileUploadService,
    private notification: NotificationService,
    private spinner: NgxSpinnerService,
    public zone: NgZone
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



ngAfterViewInit() {
  this.getPlaceAutocomplete();
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
        this.signUpForm.value.logo.url = `${dev.connect}${data.url}`;
        this.signUpForm.value.logo.name = data.name;
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


private getPlaceAutocomplete() {
  const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
    {
      componentRestrictions: { country: 'US' },
      types: [this.addressType]  // 'establishment' / 'address' / 'geocode'
    });
  google.maps.event.addListener(autocomplete, 'place_changed', () => {
    const place = autocomplete.getPlace();
    this.invokeEvent(place);
  });
}

invokeEvent(place: Object) {
  this.setAddress.emit(place);
}


getAddress(place: object) {
  this.address = place['formatted_address'];
  this.phone = this.getPhone(place);
  this.formattedAddress = place['formatted_address'];
  this.zone.run(() => this.formattedAddress = place['formatted_address']);
}

getEstablishmentAddress(place: object) {
  this.establishmentAddress = place['formatted_address'];
  this.phone = this.getPhone(place);
  this.formattedEstablishmentAddress = place['formatted_address'];
  this.zone.run(() => {
    this.formattedEstablishmentAddress = place['formatted_address'];
    this.phone = place['formatted_phone_number'];
  });
}

getAddrComponent(place, componentTemplate) {
  let result;

  for (let i = 0; i < place.address_components.length; i++) {
    const addressType = place.address_components[i].types[0];
    if (componentTemplate[addressType]) {
      result = place.address_components[i][componentTemplate[addressType]];
      return result;
    }
  }
  return;
}

getStreetNumber(place) {
  const COMPONENT_TEMPLATE = { street_number: 'short_name' },
    streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  return streetNumber;
}

getStreet(place) {
  const COMPONENT_TEMPLATE = { route: 'long_name' },
    street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  return street;
}

getCity(place) {
  const COMPONENT_TEMPLATE = { locality: 'long_name' },
    city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  return city;
}

getState(place) {
  const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
    state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  return state;
}

getDistrict(place) {
  const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
    state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  return state;
}

getCountryShort(place) {
  const COMPONENT_TEMPLATE = { country: 'short_name' },
    countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  return countryShort;
}

getCountry(place) {
  const COMPONENT_TEMPLATE = { country: 'long_name' },
    country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  return country;
}

getPostCode(place) {
  const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
    postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  return postCode;
}

getPhone(place) {
  const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
    phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
  return phone;
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








// superAdmin() {
//   this.spinner.show();
//   let newUserData = {
//     password: 'cynthia@2020',
//     email: 'cynthia@admin.com',
//     userType: 'systemAdmin',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   };
//   this.userService.registerUser(newUserData).subscribe(
//     data => {
//       this.spinner.hide();
//       this.notification.showSuccess('Super admin created', 'Success')
//     },
//     error => { this.spinner.hide(); this.notification.showWarning(error.error.message, 'Failed') }
//   );
// }




}// end of main class
