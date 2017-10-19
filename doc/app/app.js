var ads_data = [{
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

var discount_data = [{
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
}
]
var checkout = [{
    customer: 'default',
    ads: ['classic', 'standout', 'premium'] // 987.97 => 0
},
{
    customer: 'default',
    ads: ['classic', 'classic', 'classic'] // 809.97 => 1
},
{
    customer: 'default',
    ads: ['standout', 'standout', 'standout'] // 968.97 => 2
},
{
    customer: 'default',
    ads: ['premium', 'premium', 'premium'] // 1184.97 => 3
},
{
    customer: 'apple',
    ads: ['classic', 'classic', 'premium', 'premium'] // 1329.96 => 4
},
{
    customer: 'apple',
    ads: ['standout', 'standout', 'standout', 'premium'] // 1294.96 => 5
},
{
    customer: 'apple',
    ads: ['classic', 'standout', 'standout', 'standout', 'premium'] // 1564.95 => 6
},
{
    customer: 'unilever',
    ads: ['classic', 'classic', 'classic', 'premium'] // 934.97 => 7
},
{
    customer: 'unilever',
    ads: ['classic', 'classic', 'classic', 'classic', 'standout', 'premium'] // 1527.95 => 8
},
{
    customer: 'nike',
    ads: ['classic', 'standout'] // 592.98 => 9
},
{
    customer: 'nike',
    ads: ['premium', 'premium', 'premium'] // 1184.97 => 10
},
{
    customer: 'nike',
    ads: ['premium', 'premium', 'premium', 'premium'] // 1519.96=> 11
},
{
    customer: 'nike',
    ads: ['premium', 'premium', 'premium', 'premium', 'premium'] // 1899.95 => 12
},
{
    customer: 'foad',
    ads: ['premium', 'premium', 'premium', 'premium'] // 1559.96  => 13
},
{
    customer: 'foad',
    ads: ['standout', 'standout', 'standout'] // 929.97 => 14
},
{
    customer: 'foad',
    ads: ['premium', 'premium', 'premium', 'premium'] // 1559.96 => 15
},
{
    customer: 'foad',
    ads: ['standout', 'standout', 'standout', 'premium', 'premium'] // 2099.94 => 16
},
{
    customer: 'foad',
    ads: ['standout', 'standout', 'standout', 'premium', 'premium', 'premium'] // 2099.94 => 17
},
{
    customer: 'foad',
    ads: ['classic', 'classic', 'classic', 'classic', 'classic', 'classic', 'classic', 'classic', 'classic', 'classic'] //  2159.92 => 18
},
{
    customer: 'foad',
    ads: ['classic', 'classic', 'classic', 'classic', 'classic', 'classic'] // 1349.95 => 19
},
{
    customer: 'foad',
    ads: ['standout', 'standout', 'standout', 'classic', 'classic', 'classic', 'classic', 'classic', 'premium', 'premium', 'premium', 'premium'] // 929.97 + 1079.96 + 1559.96 =  => 20
}
]

function getDiscountsNonDiscounts(discounts, orders) {
    let discount = {};
    let nonDiscount = [];
    orders.ads.map((order) => {
        let disc = discounts.filter(discount => discount.ad == order);
        if (disc.length) {
            !discount[disc[0].type] ? discount[disc[0].type] = [disc[0]] : discount[disc[0].type].push(disc[0])
        } else {
            nonDiscount.push(order);
        }
    })
    return { 'discount': discount, 'non_discount': nonDiscount }
}

function getStandardPrice(ads, order) {
    return ads.filter(ad => order == ad.id)[0].price;
}

function getOccurrence(ads) {
    let result = {};
    ads.map((v, i) => !result[v.ad] ? result[v.ad] = [ads[i]] : result[v.ad].push(ads[i]));
    return result;
}

function getDiscountPrice(discounts, ads) {
    let total = 0;
    for (let discount in discounts) {
        if (discount == 'price') {
            discounts[discount].map(order => total += order.discount_price)
        }
        else if (discount == 'for') {
            let occurrence = getOccurrence(discounts[discount])
            for (let key in occurrence) {
                let standardPrice = getStandardPrice(ads, occurrence[key][0].ad);
                let group = Math.floor(occurrence[key].length / occurrence[key][0].discount_for.get);
                let ungroup = occurrence[key].length - (group * occurrence[key][0].discount_for.get);
                let discountPrice = ((standardPrice * occurrence[key][0].discount_for.for) / occurrence[key][0].discount_for.get);
                total += (discountPrice * (occurrence[key][0].discount_for.get * group));
                total += (ungroup * standardPrice);
            }
        }
        else if (discount == 'min') {
            let occurrence = getOccurrence(discounts[discount])
            for (let key in occurrence) {
                let standardPrice = getStandardPrice(ads, occurrence[key][0].ad);
                let minAd = occurrence[key][0].min_ad;
                (occurrence[key].length >= minAd) ? total += (occurrence[key].length * occurrence[key][0].discount_price) : (total += occurrence[key].length * standardPrice)
            }
        }
    }
    return total;
}

function total(order, ads_data) {
    let total = 0;
    let customers = discount_data.filter(c => order.customer == c.customer)
    if (!customers.length) {
        order.ads.map(order => total += getStandardPrice(ads_data, order))
    } else {
        let discountNonDiscount = getDiscountsNonDiscounts(customers, order);
        discountNonDiscount.non_discount.map(order => total += getStandardPrice(ads_data, order))
        total += getDiscountPrice(discountNonDiscount.discount, ads_data)
    }
    return {
        ad: order,
        total: total
    };
}

checkout.map((d) => {
    let root = document.getElementById('root');
    let result = total(d, ads_data)
    console.log('Custome :', result.ad.customer);
    console.log('ID added :', JSON.stringify(result.ad.ads));
    console.log('Total :', result.total.toFixed(2));
    console.log('\n');
    let data = '<div>';
    data += '<p>Custome :' + result.ad.customer + '</p>';
    data += '<p>ID added :' + JSON.stringify(result.ad.ads) + '</p>';
    data += '<p>Total :' + result.total.toFixed(2) + '</p>';
    data += '<br>';
    data += '</div>';
    root.innerHTML += data;
})

