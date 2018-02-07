import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {Waivers} from "../../providers/waivers-api";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";

//RxJs
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import {User} from "../../providers/user";
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
export class SubmitWaiver implements OnChanges{
    @Input()
    waiver:any;
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

    fileTransfer: FileTransferObject;


    constructor(public navCtrl: NavController,
                private user: User,
                private waiversApi: Waivers,
                private loadingCtrl: LoadingController,
                private transfer: FileTransfer,
                private photoViewer:PhotoViewer,
                private toastCtrl: ToastController
    ) {
        this.fileTransfer = this.transfer.create();
    }


    toggleSection(item) {
        item.open = !item.open
    }


    uploadAttachmentsAndSignature () {
        let observableBatch = [];

        let options: FileUploadOptions = {
            fileKey: 'file',
            headers: {
                'Authorization': 'Basic Y2xpZW50OkNdNjZnYWM/bmZnSn1CcXU='
            }
        };

        observableBatch.push(
            this.fileTransfer.upload(this.waiver.signature, 'http://ahgate.yam.ba/restserver/index.php/api/upload', options)
                .then(signatureLink => {
                    this.waiver.signature = JSON.parse(signatureLink.response).fileName;

                })
                .catch(error => {
                    console.log(`error`)
                })
        );
        this.waiver.attachments.forEach( (attachment, index) => {
            observableBatch.push(
                this.fileTransfer.upload(attachment, 'http://ahgate.yam.ba/restserver/index.php/api/upload', options)
                    .then( attachmentLink  => {
                        this.waiver.attachments[index] = JSON.parse(attachmentLink.response).fileName;
                    }).catch(error => {
                        console.log(`error`)
                    })
            );
        });

        return Observable.forkJoin(observableBatch);

    }

    submit() {
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Uploading attachments and signature',
            dismissOnPageChange: true
        });

        loading.present();
        this.uploadAttachmentsAndSignature().subscribe(
            ()  => {
                loading.dismiss().then(() => {
                    this.uploadWaiver()
                })
            }, error => loading.dismiss().then(() => this.failurePopup())
        );
    }

    uploadWaiver () {
        let waiverToSend = {
            id: 0,
            userId: this.user.getUserId(),
            name: this.waiver.guest.name,
            lastName: this.waiver.guest.lastName,
            trn: this.waiver.guest.trn,
            email: this.waiver.guest.email,
            address: this.waiver.guest.address,
            occupation: this.waiver.guest.occupation,
            phone:this.waiver.guest.phone,
            city:this.waiver.guest.city,
            country: "Jamaica",
            witnessName: this.waiver.witness.name,
            witnessLastName: this.waiver.witness.lastName,
            witnessTrn: this.waiver.witness.trn,
            witnessEmail: this.waiver.witness.email,
            witnessAddress: this.waiver.witness.address,
            witnessOccupation: this.waiver.witness.occupation,
            witnessPhone: this.waiver.witness.phone,
            witnessCity: this.waiver.witness.city,
            witnessCountry: this.waiver.witness.country,
            signature: this.waiver.signature,
            attachments: this.waiver.attachments.toString()
        };

        console.log('waiver', JSON.stringify(waiverToSend));
        return this.waiversApi.add(waiverToSend).subscribe(
            () => {
                this.successPopup();
                this.navCtrl.push(WaiversPage);
            }, error => {
                console.log(`error ${error}`);
                this.failurePopup();
            })
    }


    successAttachmentPopup () {
        let toast = this.toastCtrl.create({
            message: 'File Uploaded.',
            duration: 3000
        });
        toast.present();
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
                        this.waiverViewModel[property][property] = changes[propName].currentValue[property]
                    } else {
                        this.waiverViewModel[property] = changes[propName].currentValue[property]
                    }
                }
            }
        }
    }



}