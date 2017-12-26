import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {AlertController, NavController, ToastController} from "ionic-angular";
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
export class SubmitWaiver implements OnChanges{
    @Input()
    waiver:any;
    waiverViewModel: any = {
        guest: {
            open: true
        },
        attachments: {
            open: true
        },
        witness: {
            open: true
        },
        signature: {
            signature: '',
            open: true
        }
    };

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                private waiversApi: Waivers,
                private photoViewer:PhotoViewer,
                private toastCtrl: ToastController) {}


    toggleSection(item) {
        item.open = !item.open
    }

    submit() {
        //#TODO: This ought not to be hardcoded
        this.waiver.userId = 1;
        this.waiversApi.add(this.waiver).subscribe(
            response => {
                this.successPopup()
            }, error => {
                console.log(`error ${error}`);
                this.failurePopup();
        })
    }

    successPopup () {
        let toast = this.toastCtrl.create({
            message: 'New Waiver saved.',
            duration: 3000
        });
        toast.present();
    }

    failurePopup() {
        let toast = this.toastCtrl.create({
            message: 'Oops! There was an error sending your request',
            duration: 3000
        });
        toast.present();
    }

    cancel() {
        let alert = this.alertCtrl.create({
            title: 'Waiver Incomplete',
            message: 'Are you sure you want to exit the waiver creation process?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.navCtrl.setRoot(WaiversPage)
                    }
                }
            ]
        });
        alert.present();
    }

    showPicture (url) {
        this.photoViewer.show(url, `${this.waiver.guest.name} ${this.waiver.guest.lastname}`,{share:false})
    }

    ngOnChanges(changes: SimpleChanges) {
        for(let propName in changes) {
            if(propName == 'signature') {
                this.waiverViewModel.signature.signature = changes['signature']
            } else {
                this.waiverViewModel[propName] = changes[propName]
            }
        }
    }



}