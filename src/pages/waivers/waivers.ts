import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Waiver} from "../../models/waiver";
import {Waivers} from "../../mocks/providers/waivers";
import {ItemDetailPage} from "../item-detail/item-detail";

/**
 * Generated class for the WaiversPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-waiver',
  templateUrl: 'waivers.html',
})
export class WaiversPage {

    currentWaivers: Waiver[];

    constructor(public navCtrl: NavController, public waivers: Waivers, public modalCtrl: ModalController) {
        this.currentWaivers = this.waivers.query();
    }



    openItem(waiver: Waiver) {
        this.navCtrl.push(ItemDetailPage, {
            waiver: waiver
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaiversPage');
  }

}
