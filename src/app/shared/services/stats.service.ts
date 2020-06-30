import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { dev } from '../dev/dev';


@Injectable({
  providedIn: 'root'
})


export class StatsService {


    public url = `${dev.connect}api/stats/`;


    header = new HttpHeaders().set(
        'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
    );


    constructor( private http: HttpClient ) { }


    mostFrqRatedOrgByCustomer( data: any ) {
        return this.http.post<any>(this.url + 'mostFrqRatedOrgByCustomer', data, {headers : this.header});
    }
    averageSatRateByCustomer( data: any ) {
        return this.http.post<any>(this.url + 'averageSatRateByCustomer', data, {headers : this.header});
    }
    averageSatRateByOrg( data: any ) {
        return this.http.post<any>(this.url + 'averageSatRateByOrg', data, {headers : this.header});
    }
    mostFrqRatedIndustryByCustomer( data: any ) {
        return this.http.post<any>(this.url + 'mostFrqRatedIndustryByCustomer', data, {headers : this.header});
    }
    mostFrqSelectedEmojiByCustomer( data: any ) {
        return this.http.post<any>(this.url + 'mostFrqSelectedEmojiByCustomer', data, {headers : this.header});
    }
    mostFrqSelectedEmojiByOrg( data: any ) {
        return this.http.post<any>(this.url + 'mostFrqSelectedEmojiByOrg', data, {headers : this.header});
    }
    totalNumOfRatingByCustomer( data: any ) {
        return this.http.post<any>(this.url + 'totalNumOfRatingByCustomer', data, {headers : this.header});
    }
    totalNumOfRatingByOrg( data: any ) {
        return this.http.post<any>(this.url + 'totalNumOfRatingByOrg', data, {headers : this.header});
    }

}
