import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import swal from 'sweetalert2';
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

@Component({
  selector: 'page-invite-third',
  templateUrl: 'invite-third.html',
})
export class InviteThirdPage {
  socket: any
  descripcion: string;
  comentario: string;
  loader: any;
  userId: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public backend: BackendProvider,
    private localNotifications: LocalNotifications,
    public loadingCtrl: LoadingController
  ) {
    this.userId = localStorage.getItem('userId');
    //this.socket = io.connect('http://easy.notification.boldware.cl/api/1928/push');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InviteThirdPage');
  }

  initLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Generando notificación..."
    });
    this.loader.present();
  }
  onSubmit() {
    let params = {
      userId: this.userId,
      descripcion: this.descripcion,
      comentario: this.comentario
    }

    let message = {
      title: "Aviso",
      body: "Viene " + this.descripcion + " en camino.\n Llegará en " + this.comentario + " aproximadamente.",
      params: {}
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
