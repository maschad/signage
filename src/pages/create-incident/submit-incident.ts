import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {Incidents} from "../../providers/incidents-api";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";

//RxJs
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin'



/**
 * Generated class for the IncidentDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'submit-incident',
    templateUrl: 'submit-incident.html',
})

export class SubmitIncident implements OnChanges {

    @Input()
    incident: any;

    fileTransfer: FileTransferObject;


    incidentViewModel: any = {
        report: {
            title: '',
            description: '',
            open:true
        },
        attachments: {
            attachments:[],
            open: true
        }
    }

    constructor(
        public navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private transfer: FileTransfer,
        private incidentApi: Incidents,
        private toastCtrl: ToastController,
        private photoViewer: PhotoViewer

    ) {
        this.fileTransfer = this.transfer.create();
    }


    toggleSection(item) {
        item.open = !item.open
    }

    uploadAttachments () {
        let observableBatch = [];
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Uploading attachments',
            duration: 5000
        });


        let options: FileUploadOptions = {
            fileKey: 'file',
            headers: {
                'Authorization': 'Basic Y2xpZW50OkNdNjZnYWM/bmZnSn1CcXU='
            }
        };

        this.incident.attachments.forEach( (attachment, index) => {
            observableBatch.push(
                loading.present().then( () => {
                    return this.fileTransfer.upload(attachment, 'http://ahgate.yam.ba/restserver/index.php/api/upload', options)
                        .then( attachmentLink  => {
                            loading.dismiss().catch();
                            this.incident.attachments[index] = JSON.parse(attachmentLink.response).fileName;
                            this.successAttachmentPopup();
                        }).catch(error => {
                            loading.dismiss().catch();
                            this.failurePopup()
                        })
                })
            )
        });

        return Observable.forkJoin(observableBatch);

    }

    submit() {
        this.uploadAttachments().subscribe(() => this.uploadIncident())
    }


    uploadIncident () {
        let incidentToSend = {
            id: 0,
            userId:2,
            title: this.incident.title,
            report: this.incident.report,
            attachments: this.incident.attachments.toString()
        };

        return this.incidentApi.add(incidentToSend).subscribe(
            () => {
                this.successPopup()
            }, error => {
                console.log(`error ${error}`);
                this.failurePopup();
            })
    }


    successPopup () {
        let toast = this.toastCtrl.create({
            message: 'New Incident saved.',
            duration: 3000
        });
        toast.present();
    }

    successAttachmentPopup () {
        let toast = this.toastCtrl.create({
            message: 'Attachment Uploaded.',
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
        this.photoViewer.show(url, `${this.incident.report.title}`,{share:false})
    }

    ngOnChanges(changes: SimpleChanges): void {
        for(let propName in changes) {
            if(propName === 'incident'){
                for(let property in changes[propName].currentValue){
                    if (property === 'attachments'){
                        this.incidentViewModel[property][property] = changes[propName].currentValue[property]
                    } else {
                        this.incidentViewModel['report']['title'] = changes[propName].currentValue['title']
                        this.incidentViewModel['report']['description'] = changes[propName].currentValue['report']
                    }
                }
            }
        }
    }

}