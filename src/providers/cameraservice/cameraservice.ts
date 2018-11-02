import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform, ToastController } from 'ionic-angular';
/*
  Generated class for the CameraserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraserviceProvider {
  imageURI:any;
  imageFileName:any;

  constructor(public platform: Platform, public http: HttpClient, private camera: Camera,
    public toastCtrl: ToastController) {

    console.log('Hello CameraserviceProvider Provider');


  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  takepicture(params) {

    return new Promise((resolve, reject) => {
      let times = params.times;
      
      this.camera.getPicture(this.options)
        .then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          let base64Image = "data:image/jpeg;base64," + imageData;
        
          resolve(base64Image);
        }, (err) => {
          reject(err)
          // Handle error
        }).catch((err) => {
          reject(err)
        })
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
  getImage(params) {

    return new Promise((resolve,reject) =>{
      let times = params.times;

      const camOptions: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(camOptions)
      .then((imageData) => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        resolve(base64Image);
      }, (err) => {
        reject(err);
      }).catch((err) =>{
        reject(err);
      });
    })
  }

}
