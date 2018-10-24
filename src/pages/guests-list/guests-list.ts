import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import swal from 'sweetalert';
import {BackendProvider} from '../../providers/backend/backend';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the GuestsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-guests-list',
  templateUrl: 'guests-list.html',
})
export class GuestsListPage {
  items:any;
  toggle: boolean;
  toast: any;
  loader: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public backend: BackendProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {


      this.initLoading();
      this.backend.GUESTS_BY_USER().then(
        data => {
          this.loader.dismissAll();
          this.items = data['data'];
          console.log(this.items);
        }
      ).catch((err) => {
        console.log(err);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestsListPage');

  }
  presentToast(value) {


    if(value){
      this.toast = this.toastCtrl.create({
        message: 'Acceso concedido con éxito',
        duration: 3000,
        position: 'top'
      });
    
    }else{
      this.toast = this.toastCtrl.create({
        message: 'Acceso denegado con éxito!',
        duration: 3000,
        position: 'top'
      });
      
    }
    
    this.toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
    this.toast.present();
}

initLoading() {
  this.loader = this.loadingCtrl.create({
    content: "Cargando invitados..."
  });
  this.loader.present();
}

presentLoading() {
  this.loader = this.loadingCtrl.create({
    content: "Actualizando estado..."
  });
  this.loader.present();
}

  update(id,val){

    console.log(val);
    this.presentLoading();
    this.backend.CHANGE_THIRD_ACCESS(id,val).then(
      data => {
        this.loader.dismissAll();
        this.presentToast(val);
        console.log(data);
        
      }
    ).catch((err) => {
      console.log(err);
    })
  }
}
