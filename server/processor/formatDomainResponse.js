var gandiProvider = require('../domainProviders/gandi');
var gandi = new gandiProvider;

function formatDomainResponse() {
    // Params {
    //     name:
    //     available:
    //     price:
    //     priceBeforeDiscount:
    //     discount:
    // }
    // return {
    //     name:
    //     available:
    //     price:
    //     priceBeforeDiscount:
    //     discount:
    //     discountAmount:
    // }
    this.format = function (domainParams) {
        var price = domainParams.price ? domainParams.price : 0;
        var priceBeforeDiscount = domainParams.priceBeforeDiscount ? domainParams.priceBeforeDiscount : 0;
        var discount = domainParams.discount ? true : false;
        var discountAmount = discount ? priceBeforeDiscount - price : 0;
        var available = (domainParams.available === true || domainParams.available == 'available') ? true : false;

        return {
            name: domainParams.name,
            available: available,
            price: price,
            priceBeforeDiscount: priceBeforeDiscount,
            discount: discount,
            discountAmount: discountAmount
        };
    };
}

module.exports = formatDomainResponse;