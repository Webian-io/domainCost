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
            this.ovhCall();
            // namecheap
            // gandi
            // routes 53

        },
        ovhCall: function () {
            console.log('Call ovh');
            this.$http.get('https://www.ovh.com/engine/apiv6/order/cart/2eff4390-d8aa-4302-aac3-48174caacfa7/domain?domain=' + this.domaineName).then(function(response) {
                    console.log('Prix à l\'année', response.body[0].prices[0].price.value);
                    console.log('Réduction première année', response.body[0].prices[2].price.value);
                    console.log('Prix final', response.body[0].prices[4].price.value);
                    this.pushDomainHost('OVH', response.body[0].prices[0].price.value);
            });
        }
    }
});
