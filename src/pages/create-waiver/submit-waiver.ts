import {Component, Input} from "@angular/core";
import * as _ from "lodash";
import {NavController, NavParams} from "ionic-angular";
import {tassign} from "tassign";
import {PhotoViewer} from "@ionic-native/photo-viewer";

/**
 * Generated class for the IncidentDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'submit-waiver',
    templateUrl: 'submit-waiver.html',
})
export class SubmitWaiver {
    @Input()
    waiver: any;

    constructor(public navCtrl: NavController,
                private photoViewer: PhotoViewer) {
        // this.title = this.item.title;
        // //Set all initial items' open to true
        // _.forEach(this.item, (item) => tassign(item.open, false));

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IncidentDetailPage');
    }

    toggleSection(item) {
        item.open = !item.open
    }



}