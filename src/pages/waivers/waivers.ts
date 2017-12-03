import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {Waivers} from "../../providers/waivers-api";
import {TranslateService} from "@ngx-translate/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import {model} from "../../models/model";
import {WaiverDetailPage} from "../waiver-detail/waiver-detail";
import {FormControl} from "@angular/forms";


/**
 * Generated class for the WaiversPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-waiver',
  templateUrl: 'waivers.html',
})
export class WaiversPage {

    waiverErrorString: string;
    currentDate: number;
    waiversViewModel: any[];
    searchTerm: string = '';
    searchControl: FormControl;

    /**
     * This component handles the loading of all different waivers
     * @param {NavController} navCtrl
     * @param {Waivers} waivers
     * @param {Guests} guests
     * @param {ToastController} toastCtrl
     * @param {TranslateService} translateService
     * @param {LoadingController} loadingCtrl
     */

    constructor(private alertCtrl: AlertController,
                public navCtrl: NavController,
                public waivers: Waivers,
                public translateService: TranslateService,
                public loadingCtrl: LoadingController
    ) {
        this.translateService.get('WAIVER_LOAD_ERROR').subscribe((value) => {
            this.waiverErrorString = value;
        });
        //Getting Unix timestamp to compare
        this.currentDate = Date.now()/1000 | 0;
        this.searchControl = new FormControl();
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: this.waiverErrorString,
            buttons: ['Dismiss']
        });
        alert.present();
    }



    ionViewDidLoad() {
        this.loadWaivers();
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => this.loadWaivers())
    }

    //Load all the waivers
    loadWaivers() {
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
        });
        loading.present().then(() => {
            this.waivers.query().subscribe( data => {
                this.waiversViewModel = data;
                this.waiversViewModel =  this.waiversViewModel.filter(waiver => {
                    return waiver.guest.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                        waiver.guest.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                        waiver.guest.trn.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                        waiver.guest.address.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
                });
                loading.dismiss().catch();
            }, () => this.presentAlert());
        });
    }


    /**
     * Navigate to the detail page for this item.
     */
    openWaiver(waiver: model) {
        this.navCtrl.push(WaiverDetailPage, {
            waiver: waiver
        });
    }

}
