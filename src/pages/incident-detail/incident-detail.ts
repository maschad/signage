import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from "@ionic-native/photo-viewer";
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { tassign } from 'tassign';


/**
 * Generated class for the IncidentDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-incident-detail',
  templateUrl: 'incident-detail.html',
})
export class IncidentDetailPage {
  incident: any;
  title: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private photoViewer: PhotoViewer) {
    this.incident = navParams.get('incident');
    this.title = this.incident.title;
    //Set all initial items' open to true
    _.forEach(this.incident, (item) => tassign(item.open, true));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncidentDetailPage');
  }

  toggleSection(item) {
    item.open = !item.open
  }

  showPicture(url) {
    this.photoViewer.show(url, `${this.title}`, { share: false })
  }


}