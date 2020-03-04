[1mdiff --git a/package.json b/package.json[m
[1mindex 7131517..0a2ae99 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -17,6 +17,8 @@[m
   },[m
   "homepage": "https://github.com/Webian-io/domainCost#readme",[m
   "dependencies": {[m
[31m-    "vue": "^2.6.11"[m
[32m+[m[32m    "axios": "^0.19.2",[m
[32m+[m[32m    "vue": "^2.6.11",[m
[32m+[m[32m    "vue-resource": "^1.5.1"[m
   }[m
 }[m
[1mdiff --git a/src/index.html b/src/index.html[m
[1mindex 9a3da29..33896d0 100644[m
[1m--- a/src/index.html[m
[1m+++ b/src/index.html[m
[36m@@ -2,11 +2,19 @@[m
     <head>[m
         <link rel="stylesheet" href="style.css">[m
         <script src="../node_modules/vue/dist/vue.js"></script>[m
[32m+[m[32m        <script src="../node_modules/vue-resource/dist/vue-resource.min.js"></script>[m
     </head>[m
     <body>[m
         <div id="app">[m
[31m-            {{ message }}[m
[32m+[m[32m            <input v-model="domaineName" type="text">[m
             <button v-on:click="findDomain">Find domain</button>[m
[32m+[m
[32m+[m[32m            <div>[m
[32m+[m[32m                Résultats:[m
[32m+[m[32m                <li v-for="domainHost in domainHostsFound">[m
[32m+[m[32m                    {{ domainHost.name }} - {{ domainHost.price }}[m
[32m+[m[32m                </li>[m
[32m+[m[32m            </div>[m
         </div>[m
         <script src="script.js"></script>[m
     </body>[m
[1mdiff --git a/src/script.js b/src/script.js[m
[1mindex 38c35c5..dda1b35 100644[m
[1m--- a/src/script.js[m
[1m+++ b/src/script.js[m
[36m@@ -1,11 +1,34 @@[m
 var app = new Vue({[m
     el: '#app',[m
     data: {[m
[31m-        message: 'Hello Vue!'[m
[32m+[m[32m        domaineName: '',[m
[32m+[m[32m        domainHostsFound: [][m
     },[m
     methods: {[m
         findDomain: function (event) {[m
[31m-            console.log('Find domain triggered');[m
[32m+[m[32m            this.checkAvalabilities();[m
[32m+[m[32m        },[m
[32m+[m[32m        pushDomainHost: function (host, price) {[m
[32m+[m[32m            this.domainHostsFound.push({[m
[32m+[m[32m                name: host,[m
[32m+[m[32m                price: price[m
[32m+[m[32m            })[m
[32m+[m[32m        },[m
[32m+[m[32m        checkAvalabilities: function () {[m
[32m+[m[32m            this.ovhCall();[m
[32m+[m[32m            // namecheap[m
[32m+[m[32m            // gandi[m
[32m+[m[32m            // routes 53[m
[32m+[m
[32m+[m[32m        },[m
[32m+[m[32m        ovhCall: function () {[m
[32m+[m[32m            console.log('Call ovh');[m
[32m+[m[32m            this.$http.get('https://www.ovh.com/engine/apiv6/order/cart/2eff4390-d8aa-4302-aac3-48174caacfa7/domain?domain=' + this.domaineName).then(function(response) {[m
[32m+[m[32m                    console.log('Prix à l\'année', response.body[0].prices[0].price.value);[m
[32m+[m[32m                    console.log('Réduction première année', response.body[0].prices[2].price.value);[m
[32m+[m[32m                    console.log('Prix final', response.body[0].prices[4].price.value);[m
[32m+[m[32m                    this.pushDomainHost('OVH', response.body[0].prices[0].price.value);[m
[32m+[m[32m            });[m
         }[m
     }[m
 });[m
