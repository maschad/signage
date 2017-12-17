import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImagePicker} from "@ionic-native/image-picker";
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-create-attachment',
  templateUrl: 'create-attachment.html'
})
export class CreateAttachmentPage {
    @Output()
    imagesEvent = new EventEmitter<any[]>();

    images:any[] = [];

    constructor(private imagePicker: ImagePicker, private camera: Camera) { }

    openGallery () {
        let options = {
            maximumImagesCount: 4,
            width: 500,
            height: 500,
            quality: 75
        };

        this.imagePicker.getPictures(options).then(
            images => {
                this.images = images;
                this.imagesEvent.emit(this.images);
            },
                    err => console.log('Error retrieving photos')
        );
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
            this.imagesEvent.emit(this.images);
        }, (err) => {
            // Handle error
        });
    }

    getValidity() {
        return this.images !== [];
    }



}
