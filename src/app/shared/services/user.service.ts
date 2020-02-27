import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { dev } from '../dev/dev';


@Injectable({
  providedIn: 'root'
})


export class UserService {


    public url = `${dev.connect}api/users/`;


    header = new HttpHeaders().set(
        'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
    );


    registrationHeader = new HttpHeaders().set(
        'Authorization', `Bearer ${window.localStorage.getItem('invitedUserToken')}`
    );


    constructor( private http: HttpClient ) { }

    registerUser( registrationData: any ) {
        return this.http.post<any>(this.url + 'register', registrationData, {headers : this.registrationHeader});
    }


    loginUser( loginData: any ) {
        return this.http.post<any>(this.url + 'login', loginData);
    }


    getAllUsers() {
        return this.http.get<any>(this.url + 'getAll/', {headers : this.header});
    }


    getOneUser(id) {
        return this.http.get<any>(this.url + 'getOne/' + id, {headers : this.header});
    }


    updateUsers(id, data: any) {
        return this.http.put<any>(this.url + 'update/' + id, data, {headers : this.header});
    }


    deleteUser(id) {
        return this.http.delete<any>(this.url + 'delete/' + id, {headers : this.header});
    }


}
