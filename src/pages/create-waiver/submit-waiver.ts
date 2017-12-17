import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
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

    constructor(public navCtrl: NavController, private waiversApi: Waivers, private photoViewer:PhotoViewer, private toastCtrl: ToastController) {}


    ionViewDidLoad() {
        console.log('ionViewDidLoad IncidentDetailPage');
    }

    toggleSection(item) {
        item.open = !item.open
    }

    submit() {
        //#TODO: Fix this is future
        this.waiver.userId = 1;
        this.waiversApi.add(this.waiver).subscribe(
            response => {
                let toast = this.toastCtrl.create({
                    message: 'New Waiver saved.',
                    duration: 3000
                });
                toast.present();
            }, error => {
                console.log(`error ${error}`);
                let toast = this.toastCtrl.create({
                    message: 'Oops! There was an error sending your request',
                    duration: 3000
                });
                toast.present();
        })
    }

    cancel() {
        this.navCtrl.push(WaiversPage)
    }

    showPicture (url) {
        this.photoViewer.show(url, `${this.waiver.guest.name} ${this.waiver.guest.lastname}`,{share:false})
    }



}