import {Component, EventEmitter, Output} from '@angular/core';
import {ImagePicker} from "@ionic-native/image-picker";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AlertController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'page-create-attachment',
  templateUrl: 'create-attachment.html'
})
export class CreateAttachmentPage {
    @Output()
    imagesEvent = new EventEmitter<string>();

    images:any[] = [];
    cameraErrorString:string;
    galleryErrorString:string;

    constructor(
        private alertCtrl: AlertController,
        private imagePicker: ImagePicker,
        private camera: Camera,
        private translateService: TranslateService,
    )
    {
        this.translateService.get(
            'CAMERA_LOAD_ERROR',
        'PHOTO_LOAD_ERROR').subscribe((values) => {
            this.cameraErrorString = values.CAMERA_LOAD_ERROR;
            this.galleryErrorString = values.PHOTO_LOAD_ERROR;
        });
    }

    openGallery () {
        let options = {
            maximumImagesCount: 4,
            width: 500,
            height: 500,
            quality: 75
        };

        this.imagePicker.getPictures(options).then(
            images => {
                this.images.push(images);
                this.imagesEvent.emit(this.images.toString());
            },
                    err => {
                        this.presentAlert(this.galleryErrorString);
                        console.log('Error retrieving photos')
                    }
        );
    }

    presentAlert(message) {
        let alert = this.alertCtrl.create({
            title: 'Woops',
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    }


    takePicture () {
        let options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.images.push(imageData);
            this.imagesEvent.emit(this.images.toString());
        }, (err) => {
            // Handle error
            console.log('error', err);
            this.presentAlert(this.cameraErrorString);
        });
    }

    valid() {
        return this.images.length > 0;
    }


    removePhoto(index) {
        this.images.slice(index,1);
    }



}
