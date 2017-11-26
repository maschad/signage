import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'waiver-detail',
  templateUrl: 'waiver-detail.html'
})
export class WaiverDetailPage {
  waiver: any;
  expired: boolean;
  currentDate: number;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.waiver = navParams.get('waiver');
    //Set all initial items' open to false
    //#TODO: Optimize this
    this.waiver.guest.open = false;
    this.waiver.attachments.open = false;
    this.waiver.signature.open = false;
    this.waiver.witness.open = false;
    //Set whether this waiver is expired
    this.expired = this.waiver.expirationDate < Date.now();
    this.currentDate = Date.now();
  }

    toggleSection(item) {
      item.open = !item.open
    }


}