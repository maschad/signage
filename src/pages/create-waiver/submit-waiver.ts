import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {AlertController, NavController, ToastController} from "ionic-angular";
import {Waivers} from "../../providers/waivers-api";
import {WaiversPage} from "../waivers/waivers";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {User} from "../../providers/user";


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
    user: User;
    waiverViewModel: any = {
        guest: {
            open: true
        },
        attachments: {
            attachments: [],
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
        this.waiver.id = this.user.getUser().id;
        this.waiversApi.add(this.waiver).subscribe(
            () => {
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


    /**
     * For the purpose of the view model, we need to update it separately
     * as the model to be posted has slight property differences
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges) {
        for(let propName in changes) {
            console.log('propname' , propName);
            console.log('change', changes[propName]);
            if(propName === 'waiver'){
                for(let property in changes[propName].currentValue){
                    if(property == 'signature' || property === 'attachments'){
                        this.waiverViewModel[property][property] = changes[propName].currentValue[property]
                    } else {
                        this.waiverViewModel[property] = changes[propName].currentValue[property]
                    }
                }
            }
        }
    }



}