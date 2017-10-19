import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AuthGuard implements CanActivate {

  private userKey: any;
  constructor(
    private router: Router,
    private cookieService: CookieService) {}

  canActivate() {
    this.userKey = this.cookieService.getObject('userKey');
    if (this.userKey && this.userKey.access_token) {
      return true;
    }else {
       this.router.navigate(['checkout']);
      return false
    }
  }
}
