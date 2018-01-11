import {CreateIncidentsPage} from "./create-incidents";
import {IonicPageModule} from "ionic-angular";
import {NgModule} from "@angular/core";
import {ReportForm} from "./report-form";
import {SubmitIncident} from "./submit-incident";
import {CreateAttachmentModule} from "../create-attachment/create-attachment-module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    imports: [
        CreateAttachmentModule,
        TranslateModule,
        IonicPageModule.forChild(CreateIncidentsPage)
    ],
    declarations: [
        CreateIncidentsPage,
        ReportForm,
        SubmitIncident
    ],
    exports: [CreateIncidentsPage]
})

export class CreateIncidentModule {}