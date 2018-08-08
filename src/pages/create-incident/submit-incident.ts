import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {Incidents} from "../../providers/incidents-api";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";
import {User} from "../../providers/user";
import {IncidentsPage} from "../incidents/incidents";
import _ from 'lodash'

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
            open: false
        }
    }

    constructor(
        private user: User,
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

    async uploadAttachments () {
       let promiseBatch = []

        _.forEach(this.incident.attachments, (attachment,index) => promiseBatch.push(this.uploadFile(attachment,index)))

        return await Promise.all(promiseBatch)

    }

    async uploadFile(file, index){
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: `incident_${Date.now()}.jpeg`,
            headers: {
                'Authorization': 'Basic Y2xpZW50OkxWVjh5VnpXZnZIeGFQTGE='
            }
        };


        return await new Promise((resolve, reject) => {
            this.fileTransfer.upload(file, 'http://ahgate.alligatorhead.net/restserver/index.php/api/upload', options)
                .then( attachmentLink => {
                    this.incident.attachments[index] = JSON.parse(attachmentLink.response).fileName;
                    resolve()
                })
                .catch(error => {
                    console.log('error');
                    reject()
                })

        })

    }

    submit() {

        let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Uploading attachments',
            dismissOnPageChange: true
        });

        loading.present();

        this.uploadAttachments().then(
            () => {
                loading.dismiss().then(() =>  this.uploadIncident())
            },
                error => loading.dismiss().then(() => this.failurePopup())
        )
    }


    uploadIncident () {
        let incidentToSend = {
            id: 0,
            userId: this.user.getUserId(),
            title: this.incident.title,
            report: this.incident.report,
            attachments: this.incident.attachments.toString()
        };

        return this.incidentApi.add(incidentToSend).subscribe(
            () => {
                this.successPopup()
                this.navCtrl.setRoot(IncidentsPage)
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

    failurePopup() {
        let toast = this.toastCtrl.create({
            message: 'Oops! There was an error sending your info',
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