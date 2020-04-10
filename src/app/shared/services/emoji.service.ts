import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { dev } from '../dev/dev';


@Injectable({
  providedIn: 'root'
})


export class EmojiService {


    public url = `${dev.connect}api/emoji/`;


    header = new HttpHeaders().set(
        'Authorization', `Bearer ${window.localStorage.getItem('loggedUserToken')}`
    );


    constructor( private http: HttpClient ) { }


    createEmoji( data: any ) {
        return this.http.post<any>(this.url + 'create', data, {headers : this.header});
    }


    getAllEmojis() {
        return this.http.get<any>(this.url + 'getAll/', {headers : this.header});
    }


    getOneEmoji(id) {
        return this.http.get<any>(this.url + 'getOne/' + id, {headers : this.header});
    }


    updateEmoji(id, data: any) {
        return this.http.put<any>(this.url + 'update/' + id, data, {headers : this.header});
    }


    deleteEmoji(id) {
        return this.http.delete<any>(this.url + 'delete/' + id, {headers : this.header});
    }


}
