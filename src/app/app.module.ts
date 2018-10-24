import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InviteExternalPage } from '../pages/invite-external/invite-external';
import { InviteThirdPage } from '../pages/invite-third/invite-third';


import { CameraserviceProvider } from '../providers/cameraservice/cameraservice';
import { Camera } from '@ionic-native/camera';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImagehandlerProvider } from '../providers/imagehandler/imagehandler';
import { IonicStorageModule } from '@ionic/storage';
import { BackendProvider } from '../providers/backend/backend';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import {IonSimpleWizard} from '../pages/ion-simple-wizard/ion-simple-wizard.component';
import {IonSimpleWizardStep} from '../pages/ion-simple-wizard/ion-simple-wizard.step.component';
import { IdentifyPage } from '../pages/identify/identify';
import { RegisterPage } from '../pages/register/register';
import { GuestsListPage } from '../pages/guests-list/guests-list';
import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IdentifyPage,
    RegisterPage,
    IonSimpleWizard,
    IonSimpleWizardStep,
    InviteExternalPage,
    InviteThirdPage,
    GuestsListPage,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IdentifyPage,
    RegisterPage,
    InviteExternalPage,
    InviteThirdPage,
    GuestsListPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraserviceProvider,
    Camera,
    ImagehandlerProvider,
    BackendProvider,
    LocalNotifications,
    FileTransfer,
    File,
  ]
})
export class AppModule {}
