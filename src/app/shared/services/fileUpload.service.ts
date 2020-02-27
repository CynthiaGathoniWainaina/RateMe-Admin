import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { dev } from '../dev/dev';


@Injectable({
  providedIn: 'root'
})


export class FileUploadService {


    public url = `${dev.connect}api/fileUpload/`;


    header = new HttpHeaders().set(
        'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
    );


    constructor( private http: HttpClient ) { }


    uploadOrgLogo( data: any ) {
        return this.http.post<any>(this.url + 'uploadOrgLogo/', data, {headers : this.header});
    }

    removeOrgLogo(name) {
        return this.http.delete<any>(this.url + 'removeOrgLogo/' + name, {headers : this.header});
    }


    uploadUserLogo( data: any ) {
        return this.http.post<any>(this.url + 'uploadUserLogo/', data, {headers : this.header});
    }

    removeUserLogo(name) {
        return this.http.delete<any>(this.url + 'removeUserLogo/' + name, {headers : this.header});
    }

}
