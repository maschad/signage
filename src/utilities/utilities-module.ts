import { NgModule } from '@angular/core';
import {KeysPipe} from "./utilities";

@NgModule({
    imports:[],
    declarations:[KeysPipe],
    exports:[KeysPipe],
})

export class UtilitiesModule {

    static forRoot() {
        return {
            ngModule: UtilitiesModule,
            providers: [],
        };
    }
}