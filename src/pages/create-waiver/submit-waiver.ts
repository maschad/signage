import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {Waivers} from "../../providers/waivers-api";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";
import {User} from "../../providers/user";
import {WaiversPage} from "../waivers/waivers";

import _ from 'lodash'



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


    async uploadAttachmentsAndSignature ()  {

        let promiseBatch = []
        //Upload signature
        promiseBatch.push(this.uploadFile(this.waiver.signature, 'signature'));
        //upload attachments
        _.forEach(this.waiver.attachments, (attachment,index) => promiseBatch.push(this.uploadFile(attachment,'attachment',index)));

        return await Promise.all(promiseBatch)

    }

    async uploadFile(file,type,index?) {
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: `${type}_${Date.now()}.jpeg`,
            headers: {
                'Authorization': 'Basic Y2xpZW50OkxWVjh5VnpXZnZIeGFQTGE='
            }
        };


        return await new Promise((resolve, reject) => {
            this.fileTransfer.upload(file, 'http://ahgate.alligatorhead.net/restserver/index.php/api/upload', options)
                .then( attachmentLink => {
                    if(!_.isUndefined(index)){
                        this.waiver.attachments[index] = JSON.parse(attachmentLink.response).fileName;
                    } else {
                        this.waiver.signature = JSON.parse(attachmentLink.response).fileName;
                    }
                    resolve()
                })
                .catch(error => {
                    console.log('error', error);
                    reject()
                })

        })
    }





    submit() {
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Uploading attachments and signature',
            dismissOnPageChange: true
        });

        loading.present();
        this.uploadAttachmentsAndSignature().then(
            ()  => {
                loading.dismiss().then(() => {
                    this.uploadWaiver()
                })
            }, error => loading.dismiss().then(() => {console.log(`error ${error}`); this.failurePopup()})
        );
    }

    uploadWaiver () {
        let waiverToSend = {};

        if(this.waiver.witness.name === '' ) {
            waiverToSend = {
                id: 0,
                userId: this.user.getUserId(),
                name: this.waiver.guest.name,
                lastName: this.waiver.guest.lastname,
                trn: this.waiver.guest.trn,
                email: this.waiver.guest.email,
                address: this.waiver.guest.address,
                occupation: this.waiver.guest.occupation,
                phone:this.waiver.guest.phone,
                city:this.waiver.guest.city,
                country: this.waiver.guest.country,
                zipcode: this.waiver.guest.zipcode,
                signature: this.waiver.signature,
                attachments: this.waiver.attachments.toString()
            };
        } else {
            waiverToSend = {
                id: 0,
                userId: this.user.getUserId(),
                name: this.waiver.guest.name,
                lastName: this.waiver.guest.lastname,
                trn: this.waiver.guest.trn,
                email: this.waiver.guest.email,
                address: this.waiver.guest.address,
                occupation: this.waiver.guest.occupation,
                phone:this.waiver.guest.phone,
                city:this.waiver.guest.city,
                country: this.waiver.guest.country,
                witnessName: this.waiver.witness.name,
                witnessLastName: this.waiver.witness.lastname,
                witnessTrn: this.waiver.witness.trn,
                witnessEmail: this.waiver.witness.email,
                witnessAddress: this.waiver.witness.address,
                witnessOccupation: this.waiver.witness.occupation,
                witnessPhone: this.waiver.witness.phone,
                witnessCity: this.waiver.witness.city,
                witnessCountry: this.waiver.witness.country,
                witnessZipcode: this.waiver.witness.zipcode,
                signature: this.waiver.signature,
                attachments: this.waiver.attachments.toString()}
        }


        return this.waiversApi.add(waiverToSend).subscribe(
            () => {
                this.successPopup();
                this.navCtrl.setRoot(WaiversPage);
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
            message: 'Oops! There was an error sending your info',
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