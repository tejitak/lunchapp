/**
 * getting started
 */
(function(global) {
    "use strict";

    var app = teji.getPackage("teji.lunch.gettingStarted", new Vue({

        el: '#app',

        data: {
            me: null,
            accessToken: null,
            mainPanel: ""
        },

        components: {
            "lunch-login": teji.lunch.component.login
        },

        created: function() {
            this.$on("fbOnLogin", function(res){
            });
            this.$on("fbOnLogout", function(res){
            });
        },

        methods: {
        }
    }));

    window.fbAsyncInit = function() {
        app.$broadcast("fbReady");
    };
})(window);