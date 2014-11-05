/**
 * main
 */
(function(global) {
    "use strict";

    var app = teji.getPackage("teji.lunch.main", new Vue({

        el: '#app',

        data: {
            me: null,
            accessToken: null,
            mainPanel: ""
        },

        components: {
            "lunch-login": teji.lunch.component.login,
            "lunch-lp": teji.lunch.component.lp,
            "lunch-voting": teji.lunch.component.voting
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
    }));

    window.fbAsyncInit = function() {
        app.$broadcast("fbReady");
    };
})(window);