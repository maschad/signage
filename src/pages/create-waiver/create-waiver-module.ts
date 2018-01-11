import {NgModule} from "@angular/core";
import {WaiverForm} from "./waiver-form";
import {CreateWaiverPage} from "./create-waiver";
import {IonicPageModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {CreateSignaturePage} from "../create-signature/create-signature";
import {SignaturePadModule} from "angular2-signaturepad";
import {SubmitWaiver} from "./submit-waiver";
import {CreateAttachmentModule} from "../create-attachment/create-attachment-module";

@NgModule({
    imports: [
        CreateAttachmentModule,
        SignaturePadModule,
        TranslateModule,
        IonicPageModule.forChild(CreateWaiverPage)
    ],
    declarations: [
        CreateWaiverPage,
        WaiverForm,
        CreateSignaturePage,
        SubmitWaiver
    ],
    exports: [CreateWaiverPage]
})

export class CreateWaiverModule {}