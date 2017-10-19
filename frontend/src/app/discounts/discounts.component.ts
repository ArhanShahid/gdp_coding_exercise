import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HelperService} from '../services/helper.service';
import {HTTPService} from '../services/http.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  discountData: any;
  data: any;
  constructor(private helperService: HelperService, private httpService: HTTPService, private cookieService: CookieService, private router: Router) {}

  ngOnInit() {
    this.getDiscounts();
  }

  getDiscounts() {
    const self = this;
    this.httpService.getDiscounts()
      .then(data => {
        self.discountData = data;
      }, error => {
        console.error(error);
        this.helperService.errorNotification(error);
      });
  }

  discountUpdate(discount) {
      this.httpService.updateDiscount(discount)
      .then(data => {
        this.helperService.successNotification('Discount Updated.');
        this.getDiscounts();
      }, error => {
        console.error(error);
        this.helperService.errorNotification(error);
      });
    
  }

}
