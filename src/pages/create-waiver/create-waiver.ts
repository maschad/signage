import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {WaiverForm} from "./waiver-form";

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

  constructor(public navCtrl: NavController, translate: TranslateService, formBuilder: FormBuilder) {
      translate.get(['WAIVER_FORM_SLIDE1_TITLE',
          'WAIVER_FORM_SLIDE2_TITLE',
          'WAIVER_FORM_SLIDE3_TITLE',
          'WAIVER_FORM_SLIDE4_TITLE',
          'WAIVER_FORM_SLIDE5_TITLE'
      ]).subscribe(
          (values) => {
              this.slides = [
                  {
                      title: values.FORM_SLIDE1_TITLE,
                      page: new WaiverForm (formBuilder),
                  },
                  {
                      title: values.FORM_SLIDE2_TITLE,
                      page: new WaiverForm (formBuilder)
                  }
              ]
          }
      )

  }

  next(isValid) {
      if(isValid)
          this.createWaiverSlider.slideNext();
  }

  prev() {
      this.createWaiverSlider.slidePrev();
  }



}
