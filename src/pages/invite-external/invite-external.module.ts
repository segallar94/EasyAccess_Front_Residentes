import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteExternalPage } from './invite-external';

@NgModule({
  declarations: [
    InviteExternalPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteExternalPage),
  ],
})
export class InviteExternalPageModule {}
