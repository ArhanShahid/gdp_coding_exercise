import { TestBed, inject } from '@angular/core/testing';

import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutService]
    });
  });

  it('should be created', inject([CheckoutService], (service: CheckoutService) => {
    expect(service).toBeTruthy();
  }));

  it('StandardPrice', inject([CheckoutService], (service: CheckoutService) => {
    let ads_data = [{
      id: 'classic',
      name: 'Classic Ad',
      price: 269.99,
    },
    {
      id: 'standout',
      name: 'Standout Ad',
      price: 322.99,
    },
    {
      id: 'premium',
      name: 'Premium Ad',
      price: 394.99,
    }
    ];
    let order = {
      id: "classic",
      name: "Classic Ad",
      price: 269.99
    }
    expect(service.getStandardPrice(ads_data, order)).toEqual(order.price);
  }));
});
