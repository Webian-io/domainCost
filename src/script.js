var app = new Vue({
    el: '#app',
    data: {
        domaineName: '',
        domainHostsFound: []
    },
    methods: {
        findDomain: function (event) {
            this.checkAvalabilities();
        },
        pushDomainHost: function (host, price) {
            this.domainHostsFound.push({
                name: host,
                price: price
            })
        },
        checkAvalabilities: function () {
            // this.ovhCall();
            // this.namecheapCall();
            this.gandiCall();
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

        },
        ovhCall: function () {
            console.log('Call ovh');
            this.$http.get('https://www.ovh.com/engine/apiv6/order/cart/2eff4390-d8aa-4302-aac3-48174caacfa7/domain?domain=' + this.domaineName).then(function(response) {
                    console.log('Prix à l\'année', response.body[0].prices[0].price.value);
                    console.log('Réduction première année', response.body[0].prices[2].price.value);
                    console.log('Prix final', response.body[0].prices[4].price.value);
                    this.pushDomainHost('OVH', response.body[0].prices[0].price.value);
            });
        },
        namecheapCall: function () {

        },
        gandiCall: function () {
            // 4hpdouxdIIA9NCAm0GoC4ay9
            this.$http.get('https://api.gandi.net/v5/domain/check?name=' + this.domaineName, {headers: {"authorization": "Apikey 4hpdouxdIIA9NCAm0GoC4ay9"}}).then(function(response) {
                    console.log('Gandi response', response);
            });

//             INCLUDED WITH EVERY DOMAIN NAME

// 2 mailboxes with 3GB storage
// Unlimited aliases and forwarding
// 1 Standard SSL certificate 1 Year to activate
// Our LiveDNS nameservers Anycast + DNSSEC
        }
    }
});
