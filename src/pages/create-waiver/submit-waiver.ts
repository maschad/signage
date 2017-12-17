import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NavController} from "ionic-angular";
import {Waivers} from "../../providers/waivers-api";
import {WaiversPage} from "../waivers/waivers";
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
    waiver:any;

    constructor(public navCtrl: NavController, private waiversApi: Waivers, private photoViewer:PhotoViewer) {}


    ionViewDidLoad() {
        console.log('ionViewDidLoad IncidentDetailPage');
    }

    toggleSection(item) {
        item.open = !item.open
    }

    submit() {
        this.waiversApi.add(this.waiver)
    }

    cancel() {
        this.navCtrl.push(WaiversPage)
    }

    showPicture (url) {
        this.photoViewer.show(url, `${this.waiver.guest.name} ${this.waiver.guest.lastname}`,{share:false})
    }



}