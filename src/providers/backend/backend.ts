import { Tab } from 'ionic-angular/umd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { LocalNotifications } from '@ionic-native/local-notifications';
import swal from 'sweetalert';


/*
  Generated class for the BackendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackendProvider {
  URL_BACKEND: any;
  API_ENPOINTS: any;

  constructor(public http: HttpClient, private localNotifications: LocalNotifications) {
    console.log('Hello BackendProvider Provider');
    this.URL_BACKEND = 'http://easy.backend.boldware.cl/';
    this.API_ENPOINTS = {
      USERS: 'User',
    };
    
    // var socket = io.connect('http://easy.notification.boldware.cl/');
    // const httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','connectionId': '5b33201',
    //   'X-AUTH-TOKEN': 'L7S9O5M4T1I' })
    // };
    // http.put('http://easy.notification.boldware.cl/api/5b331/register',
    // { 
    // }, httpOptions).subscribe(
    //   (data) => {
    //     socket.on('connect', function() {
    //     socket.emit('register', '5b331', '5b33201');
    //     console.log("registrado");
    //     });
    //   }
    // );
    // socket.on('message', function(msg) {
    //   console.log(JSON.parse(msg).title);
    //   console.log(JSON.parse(msg).body);
    //   console.log(msg);
    //   //handle your message

    //   swal(JSON.parse(msg).title,JSON.parse(msg).body,"success");
    //   localNotifications.schedule({
    //     id: 5,
    //     title: JSON.parse(msg).title,
    //     text: JSON.parse(msg).body,
    //     priority: 2
    //     //   sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
    //     //   data: { secret: key }
    //     });
    //   });
  }

  REGISTER_SOCKET(userId){
    return new Promise((resolve,reject) => {
      const httpOptions = {
        headers: new HttpHeaders({ // 1928
        'X-AUTH-TOKEN': 'L7S9O5M4T1I' })
      };
      this.http.put('http://easy.backend.boldware.cl/Notification/' + userId,
      { 
      }, httpOptions).subscribe(
        (data) =>{
         
          resolve(data)
        },
        (error) =>{
          reject(error)
        }
      );
    });
  }

  SEND_NOTIFICATION(params){
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          //'Content-Type': 'application/x-www-form-urlencoded'
          // 'connectionId': '5b3320',
          // 'X-AUTH-TOKEN': 'L7S9O5M4T1I' 
          // 'userId': '5b33bd5cc5c7741bd9e6fc21' 
         })//.append('Access-Control-Allow-Origin' , '*')
         //.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
      };
      let data={
        'token': 'L7S9O5M4T1I',
        'message': {
          'title': params.title, 
          'body': params.body, 
          'params': {}
        }};

      console.log(data);
      this.http.post('http://easy.notification.boldware.cl/api/19289812/push',
       data,httpOptions).subscribe(
        (resp) => {
          resolve({ registered: true });
          console.log(data);
        }, (err) =>{
          console.log(err);
          reject(err);
        } 
      );
    })

  }

// las dejo por si son necesarias en el futuro, pero esto mismo está en home.ts
  CONNECT_TO_MESSAGE_SERVER(){
    var socket = io.connect('http://easy.notification.boldware.cl/');
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','connectionId': '5b3320',
      'X-AUTH-TOKEN': 'L7S9O5M4T1I' })
    };
    this.http.put('http://easy.notification.boldware.cl/api/5b33/register',
    { 
    }, httpOptions).subscribe(
      (data) => {
        socket.on('connect', function() {
        socket.emit('register', '5b33', '5b3320');
        });
      }
    );
  }

  RECEIVE_MESSAGE_NOTIFICATION(){
    var socket = io.connect('http://easy.notification.boldware.cl/');
    socket.on('message', function(msg) {
      console.log(JSON.parse(msg).title);
      console.log(JSON.parse(msg).body);
      console.log(msg);
      //handle your message

      swal(JSON.parse(msg).title,JSON.parse(msg).body,"success");
      this.localNotifications.schedule({
        id: 5,
        title: JSON.parse(msg).title,
        text: JSON.parse(msg).body,
        // title: "Hola",
        // text: "HAAAAAAAAAAAAAAA",
        priority: 2
        //   sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
        //   data: { secret: key }
        });
      });
  }

  REGISTER_NEW_USER(params) {

    return new Promise((resolve, reject) => {

      this.http.post("http://easy.backend.boldware.cl/User",
        {
          name: params.name,
          lastname: params.lastname,
          rut: params.rut,
          image1: params.image1,
          image2: params.image2,
          image3: params.image3
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }

      ).subscribe(
        (data) => {
          resolve({ registered: true })

          console.log(data)
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      )


    })
  }


  REGISTER_NEW_EXTERNAL(params) {

    return new Promise((resolve, reject) => {

      const httpOptions = {
        headers: new HttpHeaders({//'Content-Type': 'application/x-www-form-urlencoded'
      })
      };
      let data = {
        idUser: '5bcab25939d05d4124aef1d1',
          name: params.name,
          lastname: params.lastname,
          rut: params.rut,
          image1: params.image1,
          image2: params.image2,
          image3: params.image3
      };
      this.http.post("http://easy.backend.boldware.cl/Third",
        data, httpOptions
          //headers: { 'Content-Type': 'x-www-form-urlencoded' }      
          ).subscribe(
            (data) => {
              resolve({ registered: true })
              console.log(data)
            },
            (err) => {
              console.log(err);
              reject(params.image1);
            },  
            )
          })
    }

  IDENTIFY_USER(params) {

    return new Promise((resolve, reject) => {

      this.http.post("http://easy.backend.boldware.cl/User/getId",
        { 
          image: params.image
        }, 
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
      ).subscribe(
        (data) => {
          resolve({ identified: true })

          console.log(data)
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      )


    })
  }

  REGISTER_NEW_THIRD(params) {

    return new Promise((resolve, reject) => {
      // cambiar por la ruta correcta
      this.http.post("http://easy.backend.boldware.cl/Log",
        { userId:'1928',
          description: params.descripcion,
          comment: params.comentario
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }

      ).subscribe(
        (data) => {
          resolve({ registered: true })

          console.log(data)
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      )


    })
  }

  GUESTS_BY_USER() {
    
    return new Promise((resolve, reject) => {

      this.http.get('http://easy.backend.boldware.cl/Third/5bcab25939d05d4124aef1d1')
        .subscribe(
          (data) => {
            console.log(data);
            resolve({data});
          },
          (err) => {
            console.log(err);
            reject(err);
          },
        )
    })
  }

  CHANGE_THIRD_ACCESS(idThird,val){

    return new Promise((resolve, reject) => {
      this.http.put('http://easy.backend.boldware.cl/Third/' + idThird,
      {access: val},{}).subscribe(
        (data) => {
          console.log(data);
          resolve({data});
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      )
    })
  }

}
