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
            this.$http.get('http://localhost:1569/api/domain/check?domain=' + this.domaineName).then(function(response) {
                console.log('Serveur response', response);
            }).catch(function (err) {
                console.log('err', err);
            });
        }
    }
});
