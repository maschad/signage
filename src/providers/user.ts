import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions} from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public http: Http, public api: Api) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Basic Y2xpZW50OkNdNjZnYWM/bmZnSn1CcXU=');
    let options = new RequestOptions({ headers: headers });
    let seq = this.api.post('signin', accountInfo, options).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
          // If the API returned a successful response, mark the user as logged in
        if (res.status != 404) {
          this._loggedIn(res);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          this._loggedIn(res);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp[0];
  }

  getUser() {
      return this._user;
  }

  getUserId() {
      return this._user.id;
  }
}
