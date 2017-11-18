import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Waivers} from "../../providers/waivers-api";
import {Guests} from "../../providers/guests-api";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


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

    }



    ionViewDidLoad() {
        this.waivers.query().subscribe( data => this.waiversViewModel = data)
    }


}
