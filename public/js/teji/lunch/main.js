/**
 * main
 */
(function(global) {
    "use strict";

    var app = new Vue({
        el: '#app',
        data: {
            test: "",
            me: null,
            accessToken: null
        },
        components: {
            "lunch-login": teji.lunch.login,
            "lunch-list-shops": teji.lunch.listShops
        },

        created: function() {
            // listen fb auth
            this.test = "This is a test!";
        },

        methods: {

        }
    });

    window.fbAsyncInit = function() {
        app.$broadcast("fbReady");
    };
})(window);