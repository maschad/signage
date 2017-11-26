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
    console.log('waiver', JSON.stringify(this.waiver));
    this.waiver.guest.open = false;
    this.expired = this.waiver.expirationDate < Date.now();
    this.currentDate = Date.now();
  }

    toggleSection(item) {
      item.open = !item.open
    }


}
