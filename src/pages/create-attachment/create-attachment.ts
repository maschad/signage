import {Component, EventEmitter, Output} from '@angular/core';
import {ImagePicker} from "@ionic-native/image-picker";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AlertController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import _ from 'lodash'

const base64prepend: string = 'data:image/jpeg;base64,';

@Component({
  selector: 'page-create-attachment',
  templateUrl: 'create-attachment.html'
})
export class CreateAttachmentPage {
    @Output()
    imagesEvent = new EventEmitter<any>();

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
                _.forEach(images, image => {
                    this.images.push(image);
                });
                this.images.reverse();
                this.imagesEvent.emit(this.images);
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
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.images.push(base64prepend.concat(imageData));
            this.images.reverse();
            this.imagesEvent.emit(this.images);
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
        let confirm = this.alertCtrl.create({
            title: 'Sure you want to delete this photo? There is NO undo!',
            message: '',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        console.log('Agree clicked');
                        this.images.splice(index, 1);
                    }
                }
            ]
        });
        confirm.present();
    }



}
