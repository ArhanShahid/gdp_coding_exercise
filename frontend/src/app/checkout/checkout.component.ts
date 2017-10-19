import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { HTTPService } from '../services/http.service';
import { CheckoutService } from '../services/checkout.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  user: any = { email: null, password: null };
  checkout: any = { name: null, ads: [], total: 0.00 };
  adsData: any;
  discountData: any;
  avalibleDiscount: any = [];
  constructor(private helperService: HelperService, private checkoutService: CheckoutService, private httpService: HTTPService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.getAds();
    this.getDiscounts();
  }

  onSubmit() {
    if (this.user.email && this.user.password) {
      this.httpService.login(this.user)
        .then(data => {
          this.cookieService.putObject('userKey', data);
          this.router.navigate(['dashboard']);
        }, error => {
          console.error(error);
          this.helperService.errorNotification(error);
        });
    } else {
      this.helperService.errorNotification('Invalid or missing filed.')
    }
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

  addToChart(ad) {
    this.checkout.ads.push(ad);
    this.checkout.total = this.getTotal(this.checkout.ads, this.adsData, this.avalibleDiscount);
  }
  nameChange() {
    this.avalibleDiscount = this.discountData.filter(c => this.checkout.name.toLowerCase() == c.customer);
    this.checkout.total = this.getTotal(this.checkout.ads, this.adsData, this.avalibleDiscount);
  }
  addAd(ad) {
    let data = this.adsData.filter(data => data.name == ad);
    if (data[0]) {
      this.checkout.ads.push(data[0])
      this.checkout.total = this.getTotal(this.checkout.ads, this.adsData, this.avalibleDiscount);
    }
  }
  removeAd(ad) {
    let index = this.checkout.ads.findIndex(data => data.name == ad);
    this.checkout.ads.splice(index, 1);
    this.checkout.total = this.getTotal(this.checkout.ads, this.adsData, this.avalibleDiscount);
  }

  getTotal(orders, ads_data, discount_data) {
    let total = 0;
    if (!discount_data.length) {
      orders.map(order => total += this.checkoutService.getStandardPrice(ads_data, order.id))
    } else {
      let discountNonDiscount = this.checkoutService.getDiscountsNonDiscounts(discount_data, orders);
      discountNonDiscount.non_discount.map(order => total += this.checkoutService.getStandardPrice(ads_data, order))
      total += this.checkoutService.getDiscountPrice(discountNonDiscount.discount, ads_data)
    }
    return total;
  }

}
