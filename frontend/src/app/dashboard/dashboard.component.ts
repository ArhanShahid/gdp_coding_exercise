import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { CookieService } from 'angular2-cookie/core';
import { HTTPService } from '../services/http.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  adsData: any = [];
  constructor(private helperService: HelperService, private cookieService: CookieService, private httpService: HTTPService, private router: Router) { }

  ngOnInit() {
    this.getAds();
  }

  getAds() {
    const self = this;
    this.httpService.getAds()
      .then(data => {
        self.adsData = data;
      }, error => {
        console.error(error);
        this.helperService.errorNotification(error);
      });
  }
  updateAd(ad) {
    if (ad.name && ad.price) {
      console.log(ad);
      this.httpService.updateAd(ad)
      .then(data => {
        this.helperService.successNotification('Ad Updated.');
        this.getAds();
      }, error => {
        console.error(error);
        this.helperService.errorNotification(error);
      });
    } else {
      this.helperService.errorNotification('Invalid or missing filed.')
    }
  }
}
