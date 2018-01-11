import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {Incidents} from "../../providers/incidents-api";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Upload} from "../../providers/upload";
import * as _ from 'lodash';


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
        private uploadApi: Upload,
        private toastCtrl: ToastController,
        private photoViewer: PhotoViewer

    ) {}

    toggleSection(item) {
        item.open = !item.open
    }

    uploadAttachments () {
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Uploading attachments'
        });

        return  _.forEach(this.incident.attachments, attachment => {
            loading.present().then( () =>
                this.uploadApi.add(attachment).subscribe( attachmentLink  => {
                        attachment = attachmentLink
                        loading.dismiss().catch()
                        this.successPopup()
                    }
                    , () => this.failurePopup())
            )
        });
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
        this.photoViewer.show(url, `${this.incident.report.title}`,{share:false})
    }

    ngOnChanges(changes: SimpleChanges): void {
        for(let propName in changes) {
            if(propName === 'incident'){
                for(let property in changes[propName].currentValue){
                    console.log('property', property)
                    if (property === 'attachments'){
                        this.incidentViewModel[property][property] = changes[propName].currentValue[property]
                    } else {
                        this.incidentViewModel['report']['title'] = changes[propName].currentValue['title']
                        this.incidentViewModel['report']['description'] = changes[propName].currentValue['report']
                        console.log('incidentView model', JSON.stringify(this.incidentViewModel))
                    }
                }
            }
        }
    }

}