import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import swal from 'sweetalert';
import {BackendProvider} from '../../providers/backend/backend';

/**
 * Generated class for the GuestsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guests-list',
  templateUrl: 'guests-list.html',
})
export class GuestsListPage {
  public items:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public backend: BackendProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestsListPage');
    this.items = this.backend.GUESTS_BY_USER();
  }

}
