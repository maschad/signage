import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { model } from '../models/model';
import {Observable} from "rxjs/Observable";

@Injectable()
export class Upload {

    constructor(public http: Http, public api: Api) {
    }


    add(file: any): Observable<any> {
        return this.api.post('upload', file)
            .map(resp => resp.json());
    }

    delete(file: model): void {
    }

}
