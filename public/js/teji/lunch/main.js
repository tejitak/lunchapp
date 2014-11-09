/**
 * main
 */
(function(global) {
    "use strict";
    
    var Vue = require("vue");
    var vueFilters = require("./filter/filters");
    var loginComponent = require("./component/login");
    var lpComponent = require("./component/lp");
    var votingComponent = require("./component/voting");
    var util = require("./common/util");

    var app = module.exports = new Vue({

        el: '#app',

        data: {
            me: null,
            accessToken: null,
            mainPanel: ""
        },

        components: {
            "lunch-login": loginComponent,
            "lunch-lp": lpComponent,
            "lunch-voting": votingComponent
        },

        created: function() {
            this.$on("fbOnLogin", function(res){
                console.log("Login! Listen in parent");
                console.log(res);
                this.mainPanel = "lunch-voting";
            });
            this.$on("fbOnLogout", function(res){
                console.log("Logout! Listen in parent");
                console.log(res);
                this.mainPanel = "lunch-lp";
            });
        },

        methods: {
        }
    });

    global.fbAsyncInit = function() {
        app.$broadcast("fbReady");
    };
})(window);