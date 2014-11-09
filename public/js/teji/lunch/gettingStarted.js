/**
 * getting started
 */
(function(global) {
    "use strict";
    
    var Vue = require("vue");
    var vueFilters = require("./filter/filters");
    var loginComponent = require("./component/login");

    var app = module.exports = new Vue({

        el: '#app',

        data: {
            me: null,
            accessToken: null,
            mainPanel: ""
        },

        components: {
            "lunch-login": loginComponent
        },

        created: function() {
            this.$on("fbOnLogin", function(res){
            });
            this.$on("fbOnLogout", function(res){
            });
        },

        methods: {
        }
    });

    global.fbAsyncInit = function() {
        app.$broadcast("fbReady");
    };
})(window);