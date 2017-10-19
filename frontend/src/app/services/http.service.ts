import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { ConstantService } from './constant.service';


@Injectable()
export class HTTPService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private token;

  constructor(private http: Http, private constant: ConstantService, private cookieService: CookieService, private router: Router) {
  }

  getHeaders() {
    this.token = this.cookieService.getObject('userKey');
    return new Headers({ 'Content-Type': 'application/json', 'access_token': this.token.access_token })
  }

  login(data: any): Promise<any> {
    return this.http
      .post(this.constant.api_base_url + '/user/login', data, { headers: this.headers })
      .toPromise()
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  logout(): Promise<any> {
    return this.http
      .get(this.constant.api_base_url + '/user/logout',
      { headers: this.getHeaders() })
      .toPromise()
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }


  getAds(): Promise<any> {
    return this.http
      .get(this.constant.api_base_url + '/ads')
      .toPromise()
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  updateAd(data: any): Promise<any> {
    return this.http
      .put(this.constant.api_base_url + '/ads/' + data._id, data, { headers: this.getHeaders() })
      .toPromise()
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  getDiscounts(): Promise<any> {
    return this.http
      .get(this.constant.api_base_url + '/discount')
      .toPromise()
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }

  updateDiscount(data: any): Promise<any> {
    return this.http
      .put(this.constant.api_base_url + '/discount/' + data._id, data, { headers: this.getHeaders() })
      .toPromise()
      .then(this.successHandler.bind(this))
      .catch(this.errorHandler.bind(this));
  }

 
  successHandler(res) {
    if (res.status == 200 && JSON.parse(res._body).status) {
      return Promise.resolve(JSON.parse(res._body).response)
    } else {
      console.log(JSON.parse(res._body).status);
      return Promise.reject(JSON.parse(res._body).error)
    }
  }

  errorHandler(res) {
    if (res.status != 200) {
      console.log('Error : ', JSON.parse(res._body).error);
      if (res.status == 401) {
        this.cookieService.removeAll();
        this.router.navigate(['checkout']);
      }
      return Promise.reject(JSON.parse(res._body).error)
    }
  }
}
