import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {WaiverForm} from "./waiver-form";
import {WaiversPage} from "../waivers/waivers";
import {User} from "../../providers/user";
import {FormBuilder} from "@angular/forms";


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
    @ViewChild('createWaiverContent') createWaiverContent: any;
    slides: Slide[];
    waiver: any;
    attachments:any[] = [];

  constructor(
              protected user: User,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public translate: TranslateService,
              private navParams: NavParams
             ) {

      let guest = this.navParams.get('guest');
      translate.get(['WAIVER_FORM_SLIDE1_TITLE',
          'WAIVER_FORM_SLIDE2_TITLE'
      ]).subscribe(
          (values) => {
              this.slides = [
                  {
                      title: values.WAIVER_FORM_SLIDE1_TITLE,
                      page: new WaiverForm (formBuilder, guest),
                  },
                  {
                      title: values.WAIVER_FORM_SLIDE2_TITLE,
                      page: new WaiverForm (formBuilder)
                  }
              ]
          }
      );
  }

  next() {
      this.createWaiverSlider.lockSwipes(false);
      this.createWaiverContent.scrollToTop();
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
      this.createWaiverContent.scrollToTop();
      this.createWaiverSlider.slidePrev();
      this.createWaiverSlider.lockSwipes(true);
  }

  recieveImages($event) {
      this.attachments = $event;
  }

  recieveSignature($event) {
      this.waiver = {
          id: this.user._user.id,
          guest: this.slides[0].page.waiver.value,
          witness: this.slides[1].page.waiver.value,
          attachments: this.attachments,
          signature: $event
      };
  }

  ionViewDidLoad() {
    this.createWaiverSlider.lockSwipes(true);
  }




}

