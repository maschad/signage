import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, ViewController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {WaiverForm} from "./waiver-form";
import {WaiversPage} from "../waivers/waivers";
import * as _ from 'lodash';
import {tassign} from "tassign";

/**
 * Generated class for the CreateWaiverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export interface Slide {
    title: string;
    page: any;
}

@Component({
    selector: 'page-create-waiver',
    templateUrl: 'create-waiver.html'
})
export class CreateWaiverPage {

    @ViewChild('createWaiverSlider') createWaiverSlider: any;
    slides: Slide[];
    waiver: any;
    attachments: any[] = [];
    signature: any[] = [];

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public translate: TranslateService,
              public formBuilder: FormBuilder
             ) {


      translate.get(['WAIVER_FORM_SLIDE1_TITLE',
          'WAIVER_FORM_SLIDE2_TITLE'
      ]).subscribe(
          (values) => {
              this.slides = [
                  {
                      title: values.WAIVER_FORM_SLIDE1_TITLE,
                      page: new WaiverForm (formBuilder),
                  },
                  {
                      title: values.WAIVER_FORM_SLIDE2_TITLE,
                      page: new WaiverForm (formBuilder)
                  }
              ]
          }
      );
      //Initial waiver object
      this.waiver = {
          guest: {
              open: false
          },
          attachments: {
              open: false
          },
          witness: {
              open: false
          },
          signature: {
              signature: '',
              open: false
          }
      };
  }

  next() {
      this.createWaiverSlider.lockSwipes(false);
      this.createWaiverSlider.slideNext();
      this.createWaiverSlider.lockSwipes(true);
  }

  cancel() {
        let alert = this.alertCtrl.create({
            title: 'Waiver Incomplete',
            message: 'Are you sure you want to exit the waiver creation process?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.navCtrl.setRoot(WaiversPage)
                    }
                }
            ]
        });
        alert.present();
  }


  prev() {
      this.createWaiverSlider.lockSwipes(false);
      this.createWaiverSlider.slidePrev();
      this.createWaiverSlider.lockSwipes(true);
  }

  recieveImages($event) {
      this.attachments = $event;
  }

  recieveSignature($event) {
      this.waiver = {
          guest: this.slides[0].page.waiver.value,
          witness: this.slides[1].page.waiver.value,
          attachments: this.attachments,
          signature: {
              signature: $event,
              open: true
          }
      };
      _.forEach(this.waiver, (item) => tassign(item.open, true))
  }

  ionViewDidLoad() {
    this.createWaiverSlider.lockSwipes(true);
  }




}

