import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, Input} from "@angular/core";
import {Guest} from "../../models/guest";

@Component({
    selector: 'waiver-form',
    templateUrl: 'waiver-form.html'
})
export class WaiverForm {
    @Input()
    waiver : FormGroup;

    constructor(private formBuilder: FormBuilder, private guest?: Guest) {
        //#TODO: Build City validator abstract control
        if(this.guest){
            this.waiver = this.formBuilder.group({
                name: [this.guest.name, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
                lastName: [this.guest.lastname, [Validators.required, Validators.pattern('^[a-zA-Z]+$') ]],
                trn: [this.guest.trn,[Validators.required, Validators.pattern('^[a-z0-9]+$')]],
                email: [this.guest.email, [Validators.required,Validators.email]],
                address: [this.guest.address, Validators.required],
                city: [this.guest.city, Validators.required],
                occupation: [this.guest.occupation, Validators.required],
                phone: [this.guest.phone, [Validators.maxLength(11), Validators.minLength(7), Validators.required]]
            });
        }else {
            this.waiver = this.formBuilder.group({
                name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
                lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$') ]],
                trn: ['',[Validators.required, Validators.pattern('^[a-z0-9]+$')]],
                email: ['', [Validators.required,Validators.email]],
                address: ['', Validators.required],
                city: ['', Validators.required],
                occupation: ['', Validators.required],
                phone: ['', [Validators.maxLength(11), Validators.minLength(7), Validators.required]]
            });
        }
    }

    valid() {
        return this.waiver.valid;
    }


}