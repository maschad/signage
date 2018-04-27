import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
import { WaiverDetailPage } from '../pages/waiver-detail/waiver-detail';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { Api } from '../providers/api';
import { Settings } from '../providers/settings';
import { User } from '../providers/user';
import { Waivers } from "../providers/waivers-api";
import { Guests} from "../providers/guests-api";

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WaiversPage } from "../pages/waivers/waivers";
import {CreateWaiverPage} from "../pages/create-waiver/create-waiver";
import {CreateIncidentsPage} from "../pages/create-incident/create-incidents";
import {UtilitiesModule} from "../utilities/utilities-module";
import {IncidentsPage} from "../pages/incidents/incidents";
import {IncidentDetailPage} from "../pages/incident-detail/incident-detail";
import {Incidents} from "../providers/incidents-api";
import {CreateWaiverModule} from "../pages/create-waiver/create-waiver-module";
import {SignaturePadModule} from "angular2-signaturepad";
import {ImagePicker} from "@ionic-native/image-picker";
import {Guest} from "../models/guest";
import {Upload} from "../providers/upload";
import {CreateIncidentModule} from "../pages/create-incident/create-incident-module";
import {Keyboard} from "@ionic-native/keyboard";
import {LegalWaiverDocumentPage} from "../pages/legal-waiver-document/legal-waiver-document";

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'setting',
    option3: 'setting2',
    option4: 'setting3'
  });
}

@NgModule({
  declarations: [
    MyApp,
    CardsPage,
    ContentPage,
    IncidentsPage,
    IncidentDetailPage,
    WaiverDetailPage,
    LoginPage,
    LegalWaiverDocumentPage,
    MapPage,
    MenuPage,
    SettingsPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    WaiversPage
  ],
  imports: [
    BrowserModule,
    CreateWaiverModule,
    CreateIncidentModule,
    HttpModule,
    UtilitiesModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot(),
    SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CardsPage,
    ContentPage,
    CreateWaiverPage,
    CreateIncidentsPage,
    IncidentsPage,
    IncidentDetailPage,
    LoginPage,
    LegalWaiverDocumentPage,
    MapPage,
    MenuPage,
    SettingsPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    WaiversPage,
    WaiverDetailPage
  ],
  providers: [
    Api,
    Camera,
    File,
    FileTransfer,
    FileTransferObject,
    GoogleMaps,
    Guests,
    Guest,
    Incidents,
    ImagePicker,
    Keyboard,
    PhotoViewer,
    SplashScreen,
    StatusBar,
    Waivers,
    Upload,
    User,
      { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
