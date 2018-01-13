import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { model } from '../models/model';
import {Observable} from "rxjs/Observable";

@Injectable()
export class Incidents {
    options: any;
    headers: any;


    constructor(public http: Http, public api: Api) {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.headers.append('Authorization', 'Basic Y2xpZW50OkNdNjZnYWM/bmZnSn1CcXU=');
        this.options = new RequestOptions({ headers: this.headers });
    }

    query(params?: any): Observable<any> {
        return this.api.get('incident', params,this.options)
            .map(resp => resp.json());
    }

    add(incident: any): Observable<any> {
        return this.api.post('incident', incident, this.options)
            .map(resp => resp.json());
    }

    delete(incident: model): void {
    }

}
