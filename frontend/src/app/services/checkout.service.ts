import { Injectable } from '@angular/core';

@Injectable()
export class CheckoutService {

  constructor() { }


  getStandardPrice(ads, order) {
    if(typeof order == 'string'){
      return ads.filter(ad => order == ad.id)[0].price;
    }else{
      return ads.filter(ad => order.id == ad.id)[0].price;
    }
  }

  getDiscountsNonDiscounts(discounts, orders) {
    console.log( 'discount',discounts);
    console.log( 'orders',orders);
    let discount = {};
    let nonDiscount = [];
    orders.map((order) => {
      let disc = discounts.filter(discount => discount.ad == order.id);
      if (disc.length) {
        !discount[disc[0].type] ? discount[disc[0].type] = [disc[0]] : discount[disc[0].type].push(disc[0])
      } else {
        nonDiscount.push(order);
      }
    })
    console.log({ 'discount': discount, 'non_discount': nonDiscount });
    return { 'discount': discount, 'non_discount': nonDiscount }
  }

  getOccurrence(ads) {
    let result = {};
    ads.map((v, i) => !result[v.ad] ? result[v.ad] = [ads[i]] : result[v.ad].push(ads[i]));
    return result;
  }

  getDiscountPrice(discounts, ads) {
    let total = 0;
    for (let discount in discounts) {
      if (discount == 'price') {
        discounts[discount].map(order => total += order.discount_price)
      }
      else if (discount == 'for') {
        let occurrence = this.getOccurrence(discounts[discount])
        for (let key in occurrence) {
          let standardPrice = this.getStandardPrice(ads, occurrence[key][0].ad);
          let group = Math.floor(occurrence[key].length / occurrence[key][0].discount_for.get);
          let ungroup = occurrence[key].length - (group * occurrence[key][0].discount_for.get);
          let discountPrice = ((standardPrice * occurrence[key][0].discount_for.for) / occurrence[key][0].discount_for.get);
          total += (discountPrice * (occurrence[key][0].discount_for.get * group));
          total += (ungroup * standardPrice);
        }
      }
      else if (discount == 'min') {
        let occurrence = this.getOccurrence(discounts[discount])
        for (let key in occurrence) {
          let standardPrice = this.getStandardPrice(ads, occurrence[key][0].ad);
          let minAd = occurrence[key][0].min_ad;
          (occurrence[key].length >= minAd) ? total += (occurrence[key].length * occurrence[key][0].discount_price) : (total += occurrence[key].length * standardPrice)
        }
      }
    }
    return total;
  }
}
