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
import swal from 'sweetalert';
import { HttpClient, HttpHeaders } from '@angular/common/http';



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

  
  constructor(public navCtrl: NavController,
    public backend: BackendProvider,
    public http: HttpClient, 
    private localNotifications: LocalNotifications) {
  }

  ionViewDidLoad(){
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

}
