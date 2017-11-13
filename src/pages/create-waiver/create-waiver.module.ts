import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateWaiverPage } from './create-waiver';

@NgModule({
  declarations: [
    CreateWaiverPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateWaiverPage),
  ],
  exports: [
    CreateWaiverPage
  ]
})
export class CreateWaiverPageModule {}
