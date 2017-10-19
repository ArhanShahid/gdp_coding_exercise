"use strict";

module.exports = {

    'admin': {
        'email': 'admin@admin.com',
        'password': '123'
    },
    'ads': [{
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
    ],
    'discounts': [{
        customer: 'unilever',
        ad: 'classic',
        type: 'for',
        min_ad: null,
        discount_price: null,
        discount_for: {
            get: 3,
            for: 2,
        }
    },
    {
        customer: 'apple',
        ad: 'standout',
        type: 'price',
        min_ad: null,
        discount_price: 299.99,
        discount_for: null
    },
    {
        customer: 'nike',
        ad: 'premium',
        type: 'min',
        min_ad: 4,
        discount_price: 379.99,
        discount_for: null
    },
    {
        customer: 'foad',
        ad: 'classic',
        type: 'for',
        min_ad: null,
        discount_price: null,
        discount_for: {
            get: 5,
            for: 4,
        }
    },
    {
        customer: 'foad',
        ad: 'standout',
        type: 'price',
        min_ad: null,
        discount_price: 309.99,
        discount_for: null
    },
    {
        customer: 'foad',
        ad: 'premium',
        type: 'min',
        min_ad: 3,
        discount_price: 389.99,
        discount_for: null
    }]
};
