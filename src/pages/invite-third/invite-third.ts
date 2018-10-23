import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import swal from 'sweetalert';
import { BackendProvider } from '../../providers/backend/backend';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as io from 'socket.io-client';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoadingController } from 'ionic-angular'
/**
 * Generated class for the InviteThirdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite-third',
  templateUrl: 'invite-third.html',
})
export class InviteThirdPage {
  socket: any
  descripcion: string;
  comentario: string;
  loader: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public backend: BackendProvider,
    private localNotifications: LocalNotifications,
    public loadingCtrl: LoadingController
  ) {
    this.socket = io.connect('http://easy.notification.boldware.cl/api/1928/push');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InviteThirdPage');
    this.localNotifications.schedule({
      id: 1,
      title: "title test",
      text: "body test"
      //   sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
      //   data: { secret: key }
    });
  }

  initLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Generando notificación..."
    });
    this.loader.present();
  }
  onSubmit() {
    let params = {
      descripcion: this.descripcion,
      comentario: this.comentario
    }

    let message = {
      title: "Aviso",
      body: "Un " + this.descripcion + "viene en camino. \n" + this.comentario + "."
    }

    this.initLoading();
    this.backend.REGISTER_NEW_THIRD(params).then(resp => {
     

      this.backend.SEND_NOTIFICATION(message).then(resp => {
        this.loader.dismissAll();
        swal("Registrado", "Se envió una notificación a conserjería.", "success");

      }).catch(err => {
        swal("Error", err.message, "error");
     });
    }).catch(err => {
      swal("Error", err.message, "error");
   })
    //     //   swal("Registrado", "Se ha registrado el tercero", "success");

    // }).catch(err=>{
    //   swal("Error",err.message,"error");
    // });
  }

}
