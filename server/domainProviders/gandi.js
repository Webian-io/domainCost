
var request = require('request');
var config = require('../config.json');

function gandi() {
    this.rescuDataDomain = function (resolve, reject, domain) {
        console.log('rescuDataDomain');
        // 2 mailboxes with 3GB storage
        // Unlimited aliases and forwarding
        // 1 Standard SSL certificate 1 Year to activate
        // Our LiveDNS nameservers Anycast + DNSSEC

        request({
            uri: 'https://api.gandi.net/v5/domain/check?name=' + domain,
            headers: {"authorization": "Apikey " + config.providers.gandi}
        }, function (error, response, body) {
            if (error) {
                reject();
                return;
            }

            body = JSON.parse(body);
            var reponse = {
                name: 'gandi',
                available: false
            };

            if (typeof body.products != 'undefined') {
                if (body.products[0].status == "available") {
                    reponse.available = true;
                    reponse.price = body.products[0].prices[0].price_after_taxes;
                    reponse.discount = body.products[0].prices[0].discount;
                    if (body.products[0].prices[0].discount) {
                        reponse.priceBeforeDiscount = body.products[0].prices[0].normal_price_after_taxes;
                    }
                }
            }

            resolve(reponse);
            return;
        });
    };
}

module.exports = gandi;