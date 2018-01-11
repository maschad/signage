import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {User} from "../../providers/user";
import {IncidentsPage} from "../incidents/incidents";
import {TranslateService} from "@ngx-translate/core";
import {ReportForm} from "./report-form";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'page-create-incidents',
    templateUrl: 'create-incidents.html'
})
export class CreateIncidentsPage {

    @ViewChild('createIncidentSlider') createIncidentSlider: any;
    incident: any;
    report: any;
    title: any;
    description: any;
    attachments: any[] = [];

    constructor(
        protected user: User,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public translate: TranslateService,
        private formBuilder: FormBuilder
    ) {}

    next() {
        this.createIncidentSlider.lockSwipes(false);
        this.createIncidentSlider.slideNext();
        this.createIncidentSlider.lockSwipes(true);
    }

    cancel() {
        let alert = this.alertCtrl.create({
            title: 'Incident form Incomplete',
            message: 'Are you sure you want to exit the incident creation process?',
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
                        this.navCtrl.setRoot(IncidentsPage)
                    }
                }
            ]
        });
        alert.present();
    }


    prev() {
        this.createIncidentSlider.lockSwipes(false);
        this.createIncidentSlider.slidePrev();
        this.createIncidentSlider.lockSwipes(true);
    }

    recieveImages($event) {
        this.incident = {
            id: this.user._user.id,
            title: this.title,
            report: this.description,
            attachments: $event
        };
    }

    recieveReport($event) {
        this.title = $event.title.value;
        this.description = $event.description.value;
    }

    ionViewDidLoad() {
        this.createIncidentSlider.lockSwipes(true);
    }




}

