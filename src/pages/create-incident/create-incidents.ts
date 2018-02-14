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
    @ViewChild('createIncidentContent') createIncidentContent: any;
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
        this.createIncidentContent.scrollToTop();
        this.createIncidentSlider.lockSwipes(true);
    }

    cancel() {
        let alert = this.alertCtrl.create({
            title: '',
            message: 'Are you sure you want to exit?',
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
        this.createIncidentContent.scrollToTop();
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
        this.title = $event.value.title;
        this.description = $event.value.description;
    }

    ionViewDidLoad() {
        this.createIncidentSlider.lockSwipes(true);
    }




}

