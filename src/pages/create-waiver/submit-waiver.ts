import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {Waivers} from "../../providers/waivers-api";
import {WaiversPage} from "../waivers/waivers";


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

    constructor(public navCtrl: NavController, private waiversApi: Waivers) {
        this.waiver = {
            guest: {
                open: false
            },
            attachments: {
                open: false
            },
            signature: {
                open: false
            },
            witness: {
                open: false
            }
        };
    }


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



}