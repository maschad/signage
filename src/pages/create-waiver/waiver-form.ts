import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, Input} from "@angular/core";
import {Guest} from "../../models/guest";
import {Waivers} from "../../providers/waivers-api";

@Component({
    selector: 'waiver-form',
    templateUrl: 'waiver-form.html'
})
export class WaiverForm {
    @Input()
    waiver : FormGroup;

    countries: any[];

    constructor(private formBuilder: FormBuilder,
                private waiversApi: Waivers,
                private guest?: Guest
    ) {
        //#TODO: Build City validator abstract control
        // If this guest has an expired waiver, pre-populate the fields
        if(this.guest){
            this.waiver = this.formBuilder.group({
                name: [this.guest.name, [Validators.required]],
                lastName: [this.guest.lastname, [Validators.required]],
                trn: [this.guest.trn,[Validators.required]],
                email: [this.guest.email, [Validators.required,Validators.email]],
                address: [this.guest.address, Validators.required],
                city: [this.guest.city, Validators.required],
                occupation: [this.guest.occupation, Validators.required],
                state: [this.guest.state, Validators.required],
                zipcode:[this.guest.zipcode, Validators.required],
                country: [this.guest.country, Validators.required],
                phone: [this.guest.phone, [Validators.maxLength(11), Validators.minLength(7), Validators.required]]
            });
        } else {
            this.waiver = this.formBuilder.group({
                name: ['', [Validators.required]],
                lastName: ['', [Validators.required]],
                trn: ['',[Validators.required]],
                email: ['', [Validators.required,Validators.email]],
                address: ['', Validators.required],
                city: ['', Validators.required],
                occupation: ['', Validators.required],
                state: [ '', Validators.required],
                zipcode:['', Validators.required],
                country: ['', Validators.required],
                phone: ['', [Validators.maxLength(11), Validators.minLength(7), Validators.required]]
            });
        }
        this.waiversApi.getCountries().subscribe(countries => this.countries = countries)
    }

    valid() {
        return this.waiver.valid;
    }


}