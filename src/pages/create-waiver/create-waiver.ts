import {Component, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
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
export class CreateWaiverPage implements OnChanges{

    @ViewChild('createWaiverSlider') createWaiverSlider: any;
    slides: Slide[];
    waiver: any;
    signature:any;
    attachments: any[] = [];

  constructor(public navCtrl: NavController,
              public translate: TranslateService,
              public formBuilder: FormBuilder,
              private viewCtrl: ViewController
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

      this.waiver = {
          guest: {
              open: false
          },
          attachments: {
              open: false
          },
          signature: {
              open: false
          },
          witness: {
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
      this.navCtrl.push(WaiversPage);
  }

  prev() {
      this.createWaiverSlider.slidePrev();
  }

  recieveImages($event) {
      this.attachments = $event;
  }

  recieveSignature($event) {
      this.signature = $event;
  }

  ionViewDidLoad() {
    this.createWaiverSlider.lockSwipes(true);
  }

    ngOnChanges(changes: SimpleChanges): void {
      if(changes.signature) {
          this.waiver = {
              guest: this.slides[0].page.waiver.value,
              witness: this.slides[1].page.waiver.value,
              attachments: this.attachments,
              signature: this.signature
          };
          _.forEach(this.waiver, (item) => tassign(item.open, false))
      }
    }




}
