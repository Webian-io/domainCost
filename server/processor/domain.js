var gandiProvider = require('../domainProviders/gandi');
var gandi = new gandiProvider;
var formatDomainResponseProcessor = require('./formatDomainResponse');
var formatDomainResponse = new formatDomainResponseProcessor;

function domainCheck() {
    this.compare = function (domainCheckResolve, domainCheckReject, domain) {
        console.log('compare domainCheck', domain);
        gandiCall(domainCheckResolve, domainCheckReject, domain);

        // OVH
        // namecheap
        // routes 53
        // GoDaddy (attention ils proposent de sites)
        // Bluehost
        // Enom
        // 1and1
        // domain.com
        // dreamHost
        // name.com
        // ipage
        // A2 Hosting

        return [];
    };

    function gandiCall(domainCheckResolve, domainCheckReject, domain) {
        var gandiResponse = new Promise(function(resolve, reject) {
            gandi.rescuDataDomain(resolve, reject, domain);
        });
        gandiResponse.then(function(reponse) {
            handleResponses(domainCheckResolve, domainCheckReject, reponse);
        });
        gandiResponse.catch(function() {

        })
    }

    function handleResponses(domainCheckResolve, domainCheckReject, reponse) {
        var responseFormatted = formatDomainResponse.format(reponse);
        domainCheckResolve(responseFormatted);
    }

    function ovhCall(domain) {
        // request('https://www.ovh.com/engine/apiv6/order/cart/2eff4390-d8aa-4302-aac3-48174caacfa7/domain?domain=' + domain, function (error, response, body) {
        //     console.log('error', error);
        //     console.log('response', response);
        //     console.log('body', body);
        // });
        // console.log('Call ovh');
        // this.$http.get('https://www.ovh.com/engine/apiv6/order/cart/2eff4390-d8aa-4302-aac3-48174caacfa7/domain?domain=' + this.domaineName).then(function(response) {
        //         console.log('Prix à l\'année', response.body[0].prices[0].price.value);
        //         console.log('Réduction première année', response.body[0].prices[2].price.value);
        //         console.log('Prix final', response.body[0].prices[4].price.value);
        //         this.pushDomainHost('OVH', response.body[0].prices[0].price.value);
        // });

        var ovh = require('ovh')({
            endpoint: 'ovh-eu',
            appKey: 'XGEdTJAhGQRzSxJT',
            appSecret: 'hNrtXZedYeXOmAbSNx5HRuKQpkiEWkdM',
            consumerKey: 'GiHAvjS2p5srvdELpsqN1RYbYsjKmEZx'
          });

          ovh.request('GET', '/me', {
            }, function (error2, response2) {
                console.log('error2', error2);
                console.log('response2', response2);
            });

        //   ovh.request('POST', '/auth/credential', {
        //     'accessRules': [
        //       { 'method': 'GET', 'path': '/*'},
        //       { 'method': 'POST', 'path': '/*'},
        //       { 'method': 'PUT', 'path': '/*'},
        //       { 'method': 'DELETE', 'path': '/*'}
        //     ]
        //   }, function (error, credential) {
        //   });
    }
}

module.exports = domainCheck;