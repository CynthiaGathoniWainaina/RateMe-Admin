import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { dev } from '../dev/dev';


@Injectable({
  providedIn: 'root'
})


export class RatingRangeService {


    public url = `${dev.connect}api/ratingRange/`;


    header = new HttpHeaders().set(
        'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
    );


    constructor( private http: HttpClient ) { }


    createRatingRange( data: any ) {
        return this.http.post<any>(this.url + 'create', data, {headers : this.header});
    }


    getAllRatingRanges() {
        return this.http.get<any>(this.url + 'getAll/', {headers : this.header});
    }


    getOneRatingRange(id) {
        return this.http.get<any>(this.url + 'getOne/' + id, {headers : this.header});
    }


    updateRatingRange(id, data: any) {
        return this.http.put<any>(this.url + 'update/' + id, data, {headers : this.header});
    }


    deleteRatingRange(id) {
        return this.http.delete<any>(this.url + 'delete/' + id, {headers : this.header});
    }


}
