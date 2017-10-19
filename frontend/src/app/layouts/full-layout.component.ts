import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { HTTPService } from '../services/http.service';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';

declare let google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  disabled = false;
  status: { isopen: boolean } = { isopen: false };

  constructor(protected helperService: HelperService,
    protected cookieService: CookieService,
    protected httpService: HTTPService,
    protected router: Router) {
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    const self = this;
  }

  public logout(): void {
    this.httpService.logout()
      .then(data => {
        this.cookieService.removeAll();
        this.router.navigate(['checkout']);
      }, error => {
        console.error(error);
        this.helperService.errorNotification(error);
      });
  }

}
