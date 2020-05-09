import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { dev } from '../dev/dev';


@Injectable({
  providedIn: 'root'
})


export class RatingPointsService {


    public url = `${dev.connect}api/ratingPoints/`;


    header = new HttpHeaders().set(
        'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
    );


    constructor( private http: HttpClient ) { }


    createRatingPoint( data: any ) {
        return this.http.post<any>(this.url + 'create', data, {headers : this.header});
    }


    getAllRatingPoints() {
        return this.http.get<any>(this.url + 'getAll/', {headers : this.header});
    }


    getOneRatingPoint(id) {
        return this.http.get<any>(this.url + 'getOne/' + id, {headers : this.header});
    }


    updateRatingPoint(id, data: any) {
        return this.http.put<any>(this.url + 'update/' + id, data, {headers : this.header});
    }


    deleteRatingPoint(id) {
        return this.http.delete<any>(this.url + 'delete/' + id, {headers : this.header});
    }


}
