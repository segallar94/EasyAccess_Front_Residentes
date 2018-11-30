import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Storage } from '@ionic/storage';
import {BackendProvider} from '../../providers/backend/backend';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CameraserviceProvider } from '../../providers/cameraservice/cameraservice'
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler'
import {  ToastController } from 'ionic-angular';

/**
 * Generated class for the InviteExternalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-invite-external',
  templateUrl: 'invite-external.html',
})
export class InviteExternalPage {
  nombre: string;
  rut: string;
  departamento: string;
  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;
  loading: any;
  third: boolean;
  imageURI:any;
  imageFileName:any;
  userId: string;
  photos: any;
  aux: any;
  temp: any;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
    public cam: CameraserviceProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public evts: Events,
    public imageHandlerProvider: ImagehandlerProvider,
    public backend: BackendProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public loadingController:LoadingController) {

      this.photos = new Array<string>();
      this.temp = new Array<string>();
      this.aux = new Array<string>();
      this.userId = localStorage.getItem('userId');
          /**
     * Step Wizard Settings
     */
    this.step = 1;//The value of the first step, always 1
    this.stepCondition = true;//Set to true if you don't need condition in every step
    this.stepDefaultCondition = this.stepCondition;//Save the default condition for every step
    //You can subscribe to the Event 'step:changed' to handle the current step
    this.evts.subscribe('step:changed', step => {
      //Handle the current step if you need
      this.currentStep = step;
      //Set the step condition to the default value
      this.stepCondition = this.stepDefaultCondition;
    });
    this.evts.subscribe('step:next', () => {
      //Do something if next
      console.log('Next pressed: ', this.currentStep);
    });
    this.evts.subscribe('step:back', () => {
      //Do something if back
      console.log('Back pressed: ', this.currentStep);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InviteExternalPage');
  }

  takePic() {
    let params = {
      times: 3
    }
    console.log(this.photos.length);
    if(this.photos.length>2){
      
      this.cam.takepicture(params).then((resp) => {
        
        this.photos = this.photos.slice(1,);
        this.photos.push(resp.toString())

      }).catch((err) => {
        console.log(err);
      });
    }

    else{
      // solo por ahora se hace así 
      this.cam.takepicture(params).then((resp) => {
        /*let urlCreator = window.URL;
      let dataBlob = this.imageHandlerProvider.getBlob(resp);
        let imageUrl = urlCreator.createObjectURL(dataBlob);
        
        */

        
      
      this.photos.push(resp.toString())
        this.cam.takepicture(params).then((resp) => {


          this.photos.push(resp.toString())

          this.cam.takepicture(params).then((resp) => {

            this.photos.push(resp.toString())

          }).catch((err) => {
            console.log(err);
          });

        }).catch((err) => {
          console.log(err);
        });


      }).catch((err) => {
        console.log(err);
      });
    }
  }

  getPic() {
    let params = {
      times: 3
    }

    if(this.photos.length>2){
      this.cam.getImage(params).then((resp) => {

        this.photos = this.photos.slice(1,);
        this.photos.push(resp.toString())

      }).catch((err) => {
        console.log(err);
      });
    }
    else{
      this.cam.getImage(params).then((resp) => {
        this.photos.push(resp.toString())
  
        this.cam.getImage(params).then((resp) => {
          this.photos.push(resp.toString())
  
          this.cam.getImage(params).then((resp) => {
            this.photos.push(resp.toString())
          }).catch((err) =>{
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      })
    }   
  }

  onFinish() {
    if (this.nombre == undefined || this.rut == undefined ){
      swal("Error","Necesita completar los datos del invitado", "error");
    }

    else{
      if(this.photos.length < 3){
        swal("Advertencia","Necesita 3 fotos para registrar a su invitado", "warning");
      }
  
      else{
        this.loading = this.loadingController.create({ content: "Espere un momento..." });
        this.loading.present();
        // Esto se puede cambiar despues si es que no es necesario guardar estos datos en la aplicacion
        // pero se recuperan desde el formulario para ser manejados segun necesidad
    
        let params = { 
          userId: this.userId,
          name: this.nombre.split(' ')[0],
          lastname: this.nombre.split(' ')[1] ,
          rut: this.rut,
          image1: this.photos[0],
          image2: this.photos[1],
          image3: this.photos[2]
        }
  
        
  
        
        this.backend.REGISTER_NEW_EXTERNAL(params).then(resp=>{
          
          this.loading.dismissAll();       
          swal("Bien hecho!", "Se ha registrado con éxito el usuario", "success");
    
        }).catch(err=>{
             
          this.loading.dismissAll();
          swal("Hubo un problema", "No hemos podido registrar el usuario", "error");
        });
        this.photos = this.aux;
      }
    }
  }  

  toggle() {
    this.stepCondition = !this.stepCondition;
  }
  getIconStep2() {
    return this.stepCondition ? 'unlock' : 'lock';
  }

  getIconStep3() {
    return this.stepCondition ? 'happy' : 'sad';
  }
  getLikeIcon() {
    return this.stepCondition ? 'thumbs-down' : 'thumbs-up';
  }

  textChange(e) {
    if (e.target.value && e.target.value.trim() !== '') {
      this.stepCondition = true;
    } else {
      this.stepCondition = false;
    }
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
  public slideNext() {
    this.slides.slideNext();
  }
}
