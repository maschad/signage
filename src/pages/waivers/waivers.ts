import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {model} from "../../models/model";
import {Waivers} from "../../providers/waivers-api";
import {Guests} from "../../providers/guests-api";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs/Rx";

/**
 * Generated class for the WaiversPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-waiver',
  templateUrl: 'waivers.html',
})
export class WaiversPage {

    waiverErrorString: string;
    guestsErrorString: string;
    waiversViewModel: any[];

    constructor(public navCtrl: NavController,
                public waivers: Waivers,
                public  guests: Guests,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                public modalCtrl: ModalController) {
        this.translateService.get('WAIVER_LOAD_ERROR').subscribe((value) => {
            this.waiverErrorString = value;
        });
        this.translateService.get('GUESTS_LOAD_ERROR').subscribe( (value) => {
            this.guestsErrorString = value;
        });

        Observable.forkJoin(this.waivers.query(),this.guests.query()).subscribe( data => {
            console.log('data ', JSON.stringify(data));
        })
    }



    ionViewDidLoad() {
    console.log('ionViewDidLoad WaiversPage');
    }

}
