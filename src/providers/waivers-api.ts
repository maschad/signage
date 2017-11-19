import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { model } from '../models/model';
import {Observable} from "rxjs/Observable";

@Injectable()
export class Waivers {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any): Observable<any> {
      let headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', 'Basic Y2xpZW50OkNdNjZnYWM/bmZnSn1CcXU=');
      let options = new RequestOptions({ headers: headers });
    return this.api.get('/waiver', params,options)
      .map(resp => resp.json());
  }

  add(waiver: model): void {
  }

  delete(waiver: model): void {
  }

}
