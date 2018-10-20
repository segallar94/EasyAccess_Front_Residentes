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
  items:any;
  toggle: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public backend: BackendProvider) {
      this.backend.GUESTS_BY_USER().then(
        data => {
          this.items = data['data'];
          console.log(this.items);
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestsListPage');
  }

  update(id,val){
    console.log(val);
    this.backend.CHANGE_THIRD_ACCESS(id,val).then(
      data => {
        console.log(data);
        
      }
    )
  }
}
