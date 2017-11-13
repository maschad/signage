import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Waivers } from '../../providers/providers';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  waiver: any;

  constructor(public navCtrl: NavController, navParams: NavParams, waivers: Waivers) {
    this.waiver = navParams.get('waiver') || waivers.defaultItem;
  }

}
