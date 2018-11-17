import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { IdentifyPage } from '../identify/identify';
import { InviteExternalPage } from '../invite-external/invite-external';
import { InviteThirdPage } from '../invite-third/invite-third';
import { GuestsListPage } from '../guests-list/guests-list';
import {BackendProvider} from '../../providers/backend/backend';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { LocalNotifications } from '@ionic-native/local-notifications';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppVersion } from '@ionic-native/app-version';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { Market } from '@ionic-native/market';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  registerPage = RegisterPage;
  identifyPage = IdentifyPage;
  inviteExternalPage = InviteExternalPage;
  inviteThirdPage = InviteThirdPage;
  guestsListPage = GuestsListPage;
  versionNumber

  
  constructor(public navCtrl: NavController,
    public backend: BackendProvider,
    public http: HttpClient, 
    private localNotifications: LocalNotifications,
    private appVersion: AppVersion,
    private auth: AuthServiceProvider,
    private market: Market) {
      console.log(auth.isLoggedIn());

      if (!auth.isLoggedIn()){
        navCtrl.setRoot(LoginPage); 
      }

      this.backend.REGISTER_SOCKET('5bcab25939d05d4124aef1d1').then((data) => {
        console.log(data['url']);
        var socket = io.connect(data['url']);
        socket.on('connect', function() {
        socket.emit('register', data['userId'], data['connectionId']);
        console.log("registrado");
        socket.on('message', function(msg) {
          console.log(msg['title']);
          console.log(msg['body']);
          console.log(msg);
          //handle your message
    
          if(msg['params'].registered==false){

            const swalWithBootstrapButtons = swal.mixin({
              confirmButtonClass: 'btn btn-success',
              cancelButtonClass: 'btn btn-danger',
              buttonsStyling: true,
            })
            swalWithBootstrapButtons({
              title: msg['title'],
              text: msg['body'],
              type: 'info',
              imageUrl: msg['params'].photo,
              imageWidth: 400,
              imageHeight: 400,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              imageAlt: 'Custom image',
              animation: false,
              showCancelButton: true,
              confirmButtonText: 'Sí',
              cancelButtonText: 'No',
              reverseButtons: true
             }).then((result) => {
              if (result.value) {
                //aceptado
                let params = {
                  title: "Aceptado",
                  body: "Puede ingresar al domicilio",
                  params: {
                    accepted: true
                  }
                }
                backend.SEND_NOTIFICATION(params);
              } else if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.cancel
              ) {
                //rechazado
                let params = {
                  title: "Rechazado",
                  body: "No puede ingresar al domicilio",
                  params: {
                    accepted: false
                  }
                }
                backend.SEND_NOTIFICATION(params);
              }
            })

             
            localNotifications.schedule({
              id: 5,
              title: msg['title'],
              text: msg['body'],
              priority: 2
              //   sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
              //   data: { secret: key }
              });
          }

          if(msg['params'].access==false){
            swal("Cuidado!"," el usuario es invitado pero no tiene permitido el ingreso al edificio","warning");
          }
          if(JSON.stringify(msg['params']) == '{}'){
            swal(msg['title'],msg['body'],"success");
          }
          localNotifications.schedule({
            id: 5,
            title: msg['title'],
            text: msg['body'],
            priority: 2
            //   sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
            //   data: { secret: key }
            });
          });
      });
      }).catch((err) => {
        console.log(err);
      })
  }

  ionViewDidLoad(){
    this.appVersion.getVersionNumber().then(version => {
      this.versionNumber = version;
      //swal(this.versionNumber,this.versionNumber,"success");
      this.backend.COMPARE_VERSION(this.versionNumber).then(resp => {
        if(resp['newVersion']==true){
         // swal("Advertencia","Es necesario actualizar la aplicación.","warning");
          const swalWithBootstrapButtons = swal.mixin({
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: true,
          })
          
          swalWithBootstrapButtons({
            title: 'Advertencia',
            text: "Debe actualizar su aplicación",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Ok',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              this.market.search('EasyAccess');
            } else if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
            ) {
              
            }
          })
        }
        else{
         // swal("ASDF","TODO BIEN","success");
        }
      })
      });

    
    // var socket = io.connect('http://easy.notification.boldware.cl/');
    // const httpOptions = {
    //   headers: new HttpHeaders({'connectionId': '5b3320',
    //   'X-AUTH-TOKEN': 'L7S9O5M4T1I' })
    // };
    // this.http.put('http://easy.notification.boldware.cl/api/5b33/register',
    // { 
    // }, httpOptions).subscribe(
    //   (data) => {
    //     socket.on('connect', function() {
    //     socket.emit('register', '5b33', '5b3320');
    //     });
    //   }
    // );
    // socket.on('message', function(msg) {
    //   console.log(JSON.parse(msg).title);
    //   console.log(JSON.parse(msg).body);
    //   console.log(msg);
    //   //handle your message

    //   swal(JSON.parse(msg).title,JSON.parse(msg).body,"success");
    //   this.localNotifications.schedule({
    //     id: 5,
    //     title: JSON.parse(msg).title,
    //     text: JSON.parse(msg).body,
    //     // title: "Hola",
    //     // text: "HAAAAAAAAAAAAAAA",
    //     priority: 2
    //     //   sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
    //     //   data: { secret: key }
    //     });
    //   });
   }

}
