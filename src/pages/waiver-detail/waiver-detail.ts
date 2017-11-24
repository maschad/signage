import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'waiver-detail',
  templateUrl: 'waiver-detail.html'
})
export class WaiverDetailPage {
  waiver: any;
  expired: boolean;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.waiver = navParams.get('waiver');
    console.log('waiver', JSON.stringify(this.waiver));
    this.waiver.map(item => item.open = false);
    this.expired = this.waiver.expirationDate < Date.now()
  }

    toggleSection(key) {
        this.waiver.open = !this.waiver[key].open;
    }


}
