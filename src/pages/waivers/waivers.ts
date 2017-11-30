import { Component } from '@angular/core';
import {LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import {Waivers} from "../../providers/waivers-api";
import {Guests} from "../../providers/guests-api";
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
    guestsErrorString: string;
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
        //Getting Unix timestamp to compare
        this.currentDate = Date.now()/1000 | 0;
        this.searchControl = new FormControl();
    }



    ionViewDidLoad() {
        this.loadWaivers();
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => this.setFilteredWaivers())
    }

    //Load all the waivers
    loadWaivers() {
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
        });
        loading.present().then(() => {
            this.waivers.query().subscribe( data => {
                this.waiversViewModel = data;
                loading.dismiss().catch();
            });
        });
    }

    /**
     * Perform a service for the proper items.
     */

    setFilteredWaivers() {
        this.waiversViewModel =  this.waiversViewModel.filter(waiver => {
            return waiver.guest.name.toLowerCase().includes(this.searchTerm.toLowerCase());
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
