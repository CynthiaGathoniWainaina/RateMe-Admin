import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { dev } from '../dev/dev';


@Injectable({
  providedIn: 'root'
})


export class OrgProfileService {


    public url = `${dev.connect}api/orgProfile/`;


    header = new HttpHeaders().set(
        'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
    );


    constructor( private http: HttpClient ) { }


    createOrgProfile( data: any ) {
        return this.http.post<any>(this.url + 'create', data, {headers : this.header});
    }


    getAllOrgProfiles() {
        return this.http.get<any>(this.url + 'getAll/', {headers : this.header});
    }


    getOneOrgProfile(id) {
        return this.http.get<any>(this.url + 'getOne/' + id, {headers : this.header});
    }


    updateOrgProfile(id, data: any) {
        return this.http.put<any>(this.url + 'update/' + id, data, {headers : this.header});
    }


    deleteOrgProfile(id) {
        return this.http.delete<any>(this.url + 'delete/' + id, {headers : this.header});
    }


}
