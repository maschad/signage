import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Incidents} from "../../providers/incidents-api";
import {model} from "../../models/model";
import {IncidentDetailPage} from "../incident-detail/incident-detail";

/**
 * Generated class for the IncidentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-incidents',
  templateUrl: 'incidents.html',
})
export class IncidentsPage {
    incidentsErrorString: string;
    incidentViewModel: any[];

  constructor(public navCtrl: NavController,
              public incidents: Incidents,
              public translateService: TranslateService,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
      this.translateService.get('INCIDENT_LOAD_ERROR').subscribe((value) => {
          this.incidentsErrorString = value;
      });
  }

  ionViewDidLoad() {
      this.loadIncidents();
  }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: this.incidentsErrorString,
            buttons: ['Dismiss']
        });
        alert.present();
    }

    //Load all the waivers
    loadIncidents() {
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
        });
        loading.present().then(() => {
            this.incidents.query().subscribe( data => {
                this.incidentViewModel = data;
                loading.dismiss().catch();
            }, () => this.presentAlert());
        });
    }

    /**
     * Navigate to the detail page for this item.
     */
    openIncident(incident: model) {
        this.navCtrl.push(IncidentDetailPage, {
            incident: incident
        });
    }

}
