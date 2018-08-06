import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { model } from '../models/model';
import {Observable} from "rxjs/Observable";

@Injectable()
export class Incidents {

    constructor(public http: Http, public api: Api) {
    }

    query(params?: any): Observable<any> {
        return this.api.get('incident', params)
            .map(resp => resp.json());
    }

    add(incident: any): Observable<any> {
        return this.api.post('incident', incident)
            .map(resp => resp.json());
    }

    delete(incident: model): void {
    }

}
