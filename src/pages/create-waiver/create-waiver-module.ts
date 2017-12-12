import {NgModule} from "@angular/core";
import {WaiverForm} from "./waiver-form";
import {CreateWaiverPage} from "./create-waiver";
import {IonicPageModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {CreateAttachmentPage} from "../create-attachment/create-attachment";

@NgModule({
    imports: [
        TranslateModule,
        IonicPageModule.forChild(CreateWaiverPage)
    ],
    declarations: [
        CreateWaiverPage,
        CreateAttachmentPage,
        WaiverForm
    ],
    exports: [CreateWaiverPage]
})

export class CreateWaiverModule {}