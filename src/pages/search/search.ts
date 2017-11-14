import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { model } from '../../models/model';

import { Waivers } from '../../providers/providers';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  
  currentWaivers: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public waivers: Waivers) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentWaivers = [];
      return;
    }
    this.currentWaivers= this.waivers.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(waiver: model) {
    this.navCtrl.push(ItemDetailPage, {
      waiver: waiver
    });
  }

}
