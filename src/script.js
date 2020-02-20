var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    methods: {
        findDomain: function (event) {
            console.log('Find domain triggered');
        }
    }
});
