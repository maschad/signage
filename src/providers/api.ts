import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
    authToken: string = 'Basic Y2xpZW50OkxWVjh5VnpXZnZIeGFQTGE=';
    contentType: string = 'application/json';
    headers: any;
    options: any;
    url: string = 'http://ahgate.alligatorhead.net/restserver/index.php/api';

    constructor(public http: Http) {
      this.headers = new Headers({'Content-Type': this.contentType});
      this.headers.append('Authorization', this.authToken);
      this.options = new RequestOptions({headers: this.headers});
  }

  private setOptions (options) {
      if (options) {
          this.options = options
      }
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    this.setOptions(options);
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, this.options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
      this.setOptions(options);
      return this.http.post(this.url + '/' + endpoint, body, this.options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
      this.setOptions(options);
      return this.http.put(this.url + '/' + endpoint, body, this.options);
  }

  delete(endpoint: string, options?: RequestOptions) {
      this.setOptions(options);
      return this.http.delete(this.url + '/' + endpoint, this.options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
      this.setOptions(options);
      return this.http.put(this.url + '/' + endpoint, body, this.options);
  }
}
