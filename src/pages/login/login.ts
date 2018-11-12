import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import swal from 'sweetalert2';

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
  password: string;
  isLogged: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthServiceProvider) {
      console.log(auth.isLoggedIn());
      if (auth.isLoggedIn()){
        navCtrl.setRoot(HomePage); 
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let f = {rut: this.rut, password: this.password};
    this.auth.login(f) // USAR ESTO CUANDO HAYA RUTA
    .then( resp => {
      console.log(resp);
      if(resp['success'] == true){
        this.isLogged = true;
        this.navCtrl.setRoot(HomePage);
        swal("Aviso","Uno de sus invitados no se ha presentado en 6 meses", "info");
      }
    }
    ).catch(
      (err) => {
        this.isLogged = false;
        swal("Error","Acceso denegado", "error");
        console.log(err)
      }
    )
  }

}
