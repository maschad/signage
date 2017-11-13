import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaiversPage } from './waivers';

@NgModule({
  declarations: [
    WaiversPage,
  ],
  imports: [
    IonicPageModule.forChild(WaiversPage),
  ],
  exports: [
    WaiversPage
  ]
})
export class WaiverPageModule {}
