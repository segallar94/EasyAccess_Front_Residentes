import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { CameraserviceProvider } from '../../providers/cameraservice/cameraservice'
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler'
import swal from 'sweetalert2';
import {BackendProvider} from '../../providers/backend/backend';
import { LoadingController } from 'ionic-angular';
import { PhonegapLocalNotification, LocalNotificationOptions } from '@ionic-native/phonegap-local-notification';
import { LocalNotifications } from '@ionic-native/local-notifications';





/**
 * Generated class for the IdentifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-identify',
  templateUrl: 'identify.html',
})
export class IdentifyPage {
  loading: any;
  constructor(public navCtrl: NavController,
    public cam: CameraserviceProvider,
    public navParams: NavParams,
    public imageHandlerProvider: ImagehandlerProvider,
    public backend: BackendProvider,
    public loadingController:LoadingController,
    private localNotification: PhonegapLocalNotification,
    public alertCtrl: AlertController,
    private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentifyPage');

  }
  public photos = new Array<string>();

  
  
  async addNotification(){
    try{
      await this.platform.ready();
      const permission = await this.localNotification.requestPermission();

      if (permission === 'granted'){
        const options: LocalNotificationOptions = {
          tag: 'myNotification',
          body: 'Hola'
        }

        const myNotification = await this.localNotification.create('Easasdadad',
        options);

        myNotification.close();
      }
    }
    catch(e){
      console.log(e);
    }
  }

  takePic() {
    let params = {
      times: 1
    }

    // solo por ahora se hace así 
    this.cam.takepicture(params).then((resp) => {
      /*let urlCreator = window.URL;
     let dataBlob = this.imageHandlerProvider.getBlob(resp);
      let imageUrl = urlCreator.createObjectURL(dataBlob);
      
      */
     
      this.photos.push(resp.toString())
    }).catch((err) => {
      console.log(err);
    });
    /*
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }*/
  }

  onSubmit() {
    this.loading = this.loadingController.create({ content: "Espere un momento..." });
    this.loading.present();

    let params = {
      image: this.photos[0]
    }
    
    this.backend.IDENTIFY_USER(params).then(resp=>{
      this.loading.dismissAll();
      swal("Aceptado", "Puede ingresar al edificio:", "success");
      
    }).catch(err=>{
      this.loading.dismissAll();
      swal("Rechazado",err.message,"error"); //hay que ver el contenido final que tendrán los mensajes
    
    });

  }


}
