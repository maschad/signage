import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateIncidentsPage } from './create-incidents';

@NgModule({
  declarations: [
    CreateIncidentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateIncidentsPage),
  ],
  exports: [
    CreateIncidentsPage
  ]
})
export class CreateIncidentsPageModule {}
