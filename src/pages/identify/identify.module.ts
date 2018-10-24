import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentifyPage } from './identify';

@NgModule({
  declarations: [
    IdentifyPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentifyPage),
  ],
  exports: [IdentifyPage],
  entryComponents: [IdentifyPage]
})
export class IdentifyPageModule {}