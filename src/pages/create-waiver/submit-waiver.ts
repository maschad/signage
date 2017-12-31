import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {Waivers} from "../../providers/waivers-api";
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
            attachments: '',
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
                private waiversApi: Waivers,
                private photoViewer:PhotoViewer,
                private toastCtrl: ToastController) {}


    toggleSection(item) {
        item.open = !item.open
    }

    submit() {
        console.log('waiver', JSON.stringify(this.waiver));
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
            if(propName === 'waiver'){
                for(let property in changes[propName].currentValue){
                    if(property == 'signature'){
                        this.waiverViewModel[property][property] = changes[propName].currentValue[property]
                    }
                    else if (property === 'attachments'){
                        this.waiverViewModel[property][property] = changes[propName].currentValue[property].split(',')
                    } else {
                        this.waiverViewModel[property] = changes[propName].currentValue[property]
                    }
                }
            }
        }
    }



}