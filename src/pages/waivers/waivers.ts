import { Component } from '@angular/core';
import {LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import {Waivers} from "../../providers/waivers-api";
import {Guests} from "../../providers/guests-api";
import {TranslateService} from "@ngx-translate/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {model} from "../../models/model";
import {WaiverDetailPage} from "../waiver-detail/waiver-detail";


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
    guestsErrorString: string;
    currentDate: number;
    loading: any;
    waiversViewModel: any[];

    /**
     * This component handles the loading of all different waivers
     * @param {NavController} navCtrl
     * @param {Waivers} waivers
     * @param {Guests} guests
     * @param {ToastController} toastCtrl
     * @param {TranslateService} translateService
     * @param {LoadingController} loadingCtrl
     * @param {ModalController} modalCtrl
     */

    constructor(public navCtrl: NavController,
                public waivers: Waivers,
                public  guests: Guests,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController) {
        this.translateService.get('WAIVER_LOAD_ERROR').subscribe((value) => {
            this.waiverErrorString = value;
        });
        this.translateService.get('GUESTS_LOAD_ERROR').subscribe( (value) => {
            this.guestsErrorString = value;
        });
        this.loading = this.loadingCtrl.create({
            spinner: 'circles',
        });
        //Getting Unix timestamp to compare
        this.currentDate = Date.now()/1000 | 0;
    }



    ionViewDidLoad() {
        this.loading.present();
        this.waivers.query().subscribe( data => {
            this.waiversViewModel = data;
            this.loading.dismiss();
        });

    }

    /**
     * Perform a service for the proper items.
     */

    filterItems(ev: any) {
        let val = ev.target.value;

        if (val && val.trim() !== '') {
            this.waiversViewModel = this.waiversViewModel.filter(function(waiver) {
                return waiver.guest.firstName.toLowerCase().includes(val.toLowerCase());
            });
        }
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
