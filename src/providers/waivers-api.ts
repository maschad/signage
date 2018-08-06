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
    return this.api.get('waiver', params)
      .map(resp => resp.json());
  }

  add(waiver: any): Observable<any> {
    return this.api.post('waiver', waiver)
        .map(resp => resp.json());
  }

  getCountries(params?: any): Observable<any> {
      return this.api.get('countries', params)
          .map(resp => resp.json())
  }

  delete(waiver: model): void {
  }

}
