import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {SignaturePad} from "angular2-signaturepad/signature-pad";

/**
 * Generated class for the CreateSignaturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-create-signature',
  templateUrl: 'create-signature.html',
})
export class CreateSignaturePage {
    signature = '';
    isDrawing = false;

    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    private signaturePadOptions: Object = {
        'minWidth': 2,
        'canvasWidth': 400,
        'canvasHeight': 200,
        'backgroundColor': '#f6fbff',
        'penColor': '#27272a'
    };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public toastCtrl: ToastController) {
  }

    ionViewDidEnter() {
        this.signaturePad.clear()
        this.storage.get('savedSignature').then((data) => {
            this.signature = data;
        });
    }

    drawComplete() {
        this.isDrawing = false;
    }

    drawStart() {
        this.isDrawing = true;
    }

    savePad() {
        this.signature = this.signaturePad.toDataURL();
        this.storage.set('savedSignature', this.signature);
        this.signaturePad.clear();
        let toast = this.toastCtrl.create({
            message: 'New Signature saved.',
            duration: 3000
        });
        toast.present();
    }

    clearPad() {
        this.signaturePad.clear();
    }

}
