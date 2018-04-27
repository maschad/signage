import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { legalWaiverDocument } from './legalWaiverDocumentHTML';
import {CreateWaiverPage} from "../create-waiver/create-waiver";

/**
 * Generated class for the LegalWaiverDocumentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-legal-waiver-document',
  templateUrl: 'legal-waiver-document.html',
})
export class LegalWaiverDocumentPage {
    legalWaiverDocument: any = legalWaiverDocument

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegalWaiverDocumentPage');
  }

  completeWaiver() {
      this.navCtrl.setRoot(CreateWaiverPage);
  }

}
