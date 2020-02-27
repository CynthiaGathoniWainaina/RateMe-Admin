import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { dev } from '../dev/dev';


@Injectable({
  providedIn: 'root'
})


export class UserProfileService {


    public url = `${dev.connect}api/userProfile/`;


    header = new HttpHeaders().set(
        'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
    );


    constructor( private http: HttpClient ) { }


    createUserProfile( data: any ) {
        return this.http.post<any>(this.url + 'create', data, {headers : this.header});
    }


    getAllUserProfiles() {
        return this.http.get<any>(this.url + 'getAll/', {headers : this.header});
    }


    getOneUserProfile(id) {
        return this.http.get<any>(this.url + 'getOne/' + id, {headers : this.header});
    }


    updateUserProfile(id, data: any) {
        return this.http.put<any>(this.url + 'update/' + id, data, {headers : this.header});
    }


    deleteUserProfile(id) {
        return this.http.delete<any>(this.url + 'delete/' + id, {headers : this.header});
    }


}
