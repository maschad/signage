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

    }



    ionViewDidLoad() {
        this.loadWaiverViewModel().subscribe( data => console.log('data', JSON.stringify(data[1])))
    }

    loadWaiverViewModel() {
        return this.waivers.query()
            .flatMap(waivers => {
                if (waivers.length > 0) {
                    return Observable.forkJoin(
                        waivers.map(waiver => {
                            return this.guests.query(waiver.guestId)
                                .map(guests => {
                                    let toRet = [];
                                    for(let x = 0; x < guests.length; x++){
                                        toRet.push({
                                            name: guests[x].name,
                                            lastName: guests[x].lastName,
                                            trn: guests[x].trn,
                                            address: guests[x].address,
                                            expirationDate: waiver.expirationDate
                                        })
                                    }
                                    return toRet
                                });
                        })
                    );
                }
                console.log('here');
                return Observable.of([]);
            })
    }

}
