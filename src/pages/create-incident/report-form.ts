import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, EventEmitter, Output} from "@angular/core";

@Component({
    selector: 'report-form',
    templateUrl: 'report-form.html'
})
export class ReportForm {
    @Output()
    reportEvent = new EventEmitter<any>();
    report : FormGroup;

    constructor(private formBuilder: FormBuilder) {
            this.report = this.formBuilder.group({
                title: ['', [Validators.required]],
                description: ['', [Validators.required]],
            });

    }

    valid() {
        if(this.report.valid){
            this.reportEvent.emit(this.report)
        }
        return this.report.valid;
    }


}