import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import {model} from "../models/model";

@Injectable()
export class Guests {

    constructor(public http: Http, public api: Api) {
    }

    query(params?: any) {
        return this.api.get('/guest', params)
            .map(resp => resp.json());
    }

    add(guest: model) {
    }

    delete(guest: model) {
    }

}
