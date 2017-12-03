import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

import {WaiversPage} from "../waivers/waivers";
import {CreateWaiverPage} from "../create-waiver/create-waiver";
import {IncidentsPage} from "../incidents/incidents";
import {CreateIncidentsPage} from "../create-incident/create-incidents";
import {LoginPage} from "../login/login";



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
        {title: 'Waivers', component: WaiversPage},
        {title: 'New Waiver', component: CreateWaiverPage},
        {title: 'Incidents', component: IncidentsPage},
        {title: 'New Incident', component: CreateIncidentsPage},
        {title: 'Sign Out', component: LoginPage}
    ];
  }

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
