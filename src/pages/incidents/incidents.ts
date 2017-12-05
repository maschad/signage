import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Incidents} from "../../providers/incidents-api";
import {model} from "../../models/model";
import {IncidentDetailPage} from "../incident-detail/incident-detail";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';


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
    searchTerm: string = '';
    searchControl: FormControl;

  constructor(public navCtrl: NavController,
              public incidents: Incidents,
              public translateService: TranslateService,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
      this.translateService.get('INCIDENT_LOAD_ERROR').subscribe((value) => {
          this.incidentsErrorString = value;
      });
      this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
      this.loadIncidents();
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => this.loadIncidents())
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
                //Filter on criteria
                this.incidentViewModel =  this.incidentViewModel.filter(incident => {
                    return incident.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                        incident.user.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                        incident.user.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
                });
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
