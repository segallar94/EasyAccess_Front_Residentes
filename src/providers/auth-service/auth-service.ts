import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {
  rut: string;
  loggedIn: boolean;
  URL_BACKEND: any;

  constructor(public http: HttpClient) {
    this.rut = "";
    this.loggedIn = false;
    this.URL_BACKEND = 'http://easy.backend.boldware.cl/';

    console.log('Hello AuthServiceProvider Provider');
  }

  login(userInfo){    
    return new Promise((resolve, reject) => {

      this.http.post(this.URL_BACKEND,
        {
          rut: userInfo.rut,
          password: userInfo.password
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }

      )
      .subscribe(
        (resp) => {
          localStorage.setItem('token', resp['status']);
          this.rut = userInfo.rut;
          this.loggedIn = true;
          resolve(this.loggedIn = true);

        },
        (err) => {
          console.log(err);
          reject(this.loggedIn = false);
        },
      )
    })
  }

  logout(): void {
    localStorage.removeItem('token');
    this.rut = "";
    this.loggedIn = false;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

}
