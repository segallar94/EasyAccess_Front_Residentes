import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import swal from 'sweetalert';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rut: string;
  pass: string;
  isLogged: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let f = {rut: this.rut, pass: this.pass};
    // this.auth.login(f) // USAR ESTO CUANDO HAYA RUTA
    // .then( resp => {
    //   if(resp == true){
    //     this.isLogged = true;
    //     this.navCtrl.setRoot(HomePage);
    //   }
    //   else{
    //     this.isLogged = false;
    //     swal("Error","Acceso denegado", "error");
    //   }
    // }
    // ).catch(
    //   (err) => console.log(err)
    // )
    if(f.pass == '123'){
      this.isLogged = true;
      this.navCtrl.setRoot(HomePage);
      swal("Aviso","Uno de sus invitados no se ha presentado en 6 meses", "info");
    }
    else{
      this.isLogged = false;
      swal("Error","Acceso denegado", "error");
    }
  }

}
