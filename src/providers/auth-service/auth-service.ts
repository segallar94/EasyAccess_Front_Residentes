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
  URL_BACKEND: any;

  private loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(public http: HttpClient) {
    this.rut = "";
    this.URL_BACKEND = 'http://easy.backend.boldware.cl';
    localStorage.setItem('loggedIn', 'false');

    console.log('Hello AuthServiceProvider Provider');
  }

  login(userInfo){    
    console.log(userInfo);
    return new Promise((resolve, reject) => {

      this.http.post('http://easy.backend.boldware.cl/User/login',
        {
          rut: userInfo.rut,
          password: userInfo.password
        },
        {
         // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }

      )
      
      .subscribe(
        (resp) => {
          localStorage.setItem('loggedIn', 'true');
          console.log(resp);
          this.loggedIn = true;
          resolve(resp);

        },
        (err) => {
          console.log(err);
          reject(this.loggedIn = false);
        },
      )
    })
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    this.rut = "";
    this.loggedIn = false;
  }

  isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn')) || this.loggedIn || false;
  }

}
