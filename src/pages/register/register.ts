import {  NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CameraserviceProvider } from '../../providers/cameraservice/cameraservice'
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler'
import { Component } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Storage } from '@ionic/storage';
import {BackendProvider} from '../../providers/backend/backend';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  nombre: string;
  rut: string;
  departamento: string;
  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;
  loading: any;
  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController,
    public cam: CameraserviceProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public evts: Events,
    public imageHandlerProvider: ImagehandlerProvider,
    public backend: BackendProvider,
    public storage: Storage,
    public loadingController:LoadingController) {

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
  
  public slideNext() {
    this.slides.slideNext();
  }

  onFinish() {
    this.loading = this.loadingController.create({ content: "Espere un momento..." });
    this.loading.present();
    // Esto se puede cambiar despues si es que no es necesario guardar estos datos en la aplicacion
    // pero se recuperan desde el formulario para ser manejados segun necesidad
    this.storage.ready().then(() => {
      this.storage.set('name', this.nombre);
      this.storage.set('rut', this.rut);
      this.storage.set('departamento', this.departamento);

      let params = { 
        name: this.nombre.split(' ')[0],
          lastname: this.nombre.split(' ')[1] ,
          rut: this.rut,
          image1: this.photos[0],
          image2: this.photos[1],
          image3: this.photos[2]
       }

       this.backend.REGISTER_NEW_USER(params).then(resp=>{

        this.loading.dismissAll();
        swal("Good job!", JSON.stringify(resp), "success");

       }).catch(err=>{
         
        this.loading.dismissAll();
        swal("Good job!", err.message, "error");
       });

      
    }).catch((err)=>{ console.log(err)});
  }

  public photos = new Array<string>();
  takePic() {
    let params = {
      times: 3
    }

    // solo por ahora se hace así 
    this.cam.takepicture(params).then((resp) => {
      /*let urlCreator = window.URL;
     let dataBlob = this.imageHandlerProvider.getBlob(resp);
      let imageUrl = urlCreator.createObjectURL(dataBlob);
      
      */

      
     this.storage.ready().then(() => {
      this.storage.set('image1', resp.toString());
    
    }).catch((err) => {
      console.log(err);
    })
     
     this.photos.push(resp.toString())
      this.cam.takepicture(params).then((resp) => {

        this.storage.ready().then(() => {
          this.storage.set('image2', resp.toString());
        
        }).catch((err) => {
          console.log(err);
        })

        this.photos.push(resp.toString())

        this.cam.takepicture(params).then((resp) => {

          this.storage.ready().then(() => {
            this.storage.set('image3', resp.toString());
          
          }).catch((err) => {
            console.log(err);
          })
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
    /*
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }*/
  }
}
