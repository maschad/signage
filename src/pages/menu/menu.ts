import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

import {WaiversPage} from "../waivers/waivers";
import {CreateWaiverPage} from "../create-waiver/create-waiver";
import {IncidentsPage} from "../incidents/incidents";
import {CreateIncidentsPage} from "../create-incident/create-incidents";
import {LoginPage} from "../login/login";
import {LegalWaiverDocumentPage} from "../legal-waiver-document/legal-waiver-document";



@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WaiversPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.pages = [
        {title: 'New Waiver', component: LegalWaiverDocumentPage},
        {title: 'New Incident', component: CreateIncidentsPage},
        {title: 'Search Waivers', component: WaiversPage},
        {title: 'Search Incidents', component: IncidentsPage},
        {title: 'Sign Out', component: LoginPage}
    ];
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
