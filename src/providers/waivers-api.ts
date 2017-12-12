import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { model } from '../models/model';
import {Observable} from "rxjs/Observable";

@Injectable()
export class Waivers {
    options: any;
    headers: any;

  constructor(public http: Http, public api: Api) {
      this.headers = new Headers({'Content-Type': 'application/json'});
      this.headers.append('Authorization', 'Basic Y2xpZW50OkNdNjZnYWM/bmZnSn1CcXU=');
      this.options = new RequestOptions({ headers: this.headers });
  }

  query(params?: any): Observable<any> {
    return this.api.get('/waiver', params, this.options)
      .map(resp => resp.json());
  }

  add(waiver: model): Observable<any> {
    return this.api.post('/waiver', waiver, this.options)
        .map(resp => resp.json());
  }

  delete(waiver: model): void {
  }

}
