import {NgModule} from "@angular/core";
import {WaiverForm} from "./waiver-form";
import {CreateWaiverPage} from "./create-waiver";
import {IonicPageModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {CreateAttachmentPage} from "../create-attachment/create-attachment";
import {CreateSignaturePage} from "../create-signature/create-signature";
import {SignaturePadModule} from "angular2-signaturepad";

@NgModule({
    imports: [
        SignaturePadModule,
        TranslateModule,
        IonicPageModule.forChild(CreateWaiverPage)
    ],
    declarations: [
        CreateAttachmentPage,
        CreateWaiverPage,
        WaiverForm,
        CreateSignaturePage,
    ],
    exports: [CreateWaiverPage]
})

export class CreateWaiverModule {}