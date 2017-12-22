import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {tassign} from "tassign";

@Component({
  selector: 'waiver-detail',
  templateUrl: 'waiver-detail.html'
})
export class WaiverDetailPage {
  waiver: any;
  expired: boolean;
  currentDate: number;

  constructor(public navCtrl: NavController, navParams: NavParams, private photoViewer: PhotoViewer) {
    this.waiver = navParams.get('waiver');
    //Set all initial items' open to true
    this.waiver.guest.open = true;
    this.waiver.attachments.open = true;
    this.waiver.signature.open = true;
    if(this.waiver.witness){
        this.waiver.witness.open = true;
    } else {
        this.waiver = tassign(this.waiver, {
            guest: this.waiver.guest,
            attachments: this.waiver.attachments,
            signature: this.waiver.signature,
            witness: {
                open: false
            }
        })
    }
    //Set whether this waiver is expired
    this.expired = this.waiver.expirationDate < Date.now();
    this.currentDate = Date.now();
  }

    toggleSection(item) {
      item.open = !item.open
    }

    showPicture (url) {
      this.photoViewer.show(url, `${this.waiver.guest.name} ${this.waiver.guest.lastname}`,{share:false})
    }


}
