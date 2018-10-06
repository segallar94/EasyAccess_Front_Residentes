import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestsListPage } from './guests-list';

@NgModule({
  declarations: [
    GuestsListPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestsListPage),
  ],
})
export class GuestsListPageModule {}
