import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

import { Waivers } from '../../providers/providers';

import { Waiver } from '../../models/waiver';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentWaivers: Waiver[];

  constructor(public navCtrl: NavController, public waivers: Waivers, public modalCtrl: ModalController) {
    this.currentWaivers = this.waivers.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(waiver => {
      if (waiver) {
        this.waivers.add(waiver);
      }
    });
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(waiver) {
    this.waivers.delete(waiver);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(waiver: Waiver) {
    this.navCtrl.push(ItemDetailPage, {
      waiver: waiver
    });
  }
}
