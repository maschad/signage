import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CreateAttachmentPage} from "./create-attachment";

@NgModule({
    imports: [
        IonicPageModule.forChild(CreateAttachmentPage)
    ],
    declarations: [
        CreateAttachmentPage
    ],
    exports: [CreateAttachmentPage]
})

export class CreateAttachmentModule {}