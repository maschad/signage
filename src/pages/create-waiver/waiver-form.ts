import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, Input} from "@angular/core";

@Component({
    selector: 'waiver-form',
    templateUrl: 'waiver-form.html'
})
export class WaiverForm {
    @Input()
    waiver : FormGroup;

    constructor( private formBuilder: FormBuilder ) {
        //#TODO: Build City validator abstract control
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

    valid() {
        return this.waiver.valid;
    }


}