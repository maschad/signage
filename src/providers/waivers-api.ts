import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Waiver } from '../models/waiver';

@Injectable()
export class Waivers {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('/waiver', params)
      .map(resp => resp.json());
  }

  add(waiver: Waiver) {
  }

  delete(waiver: Waiver) {
  }

}
