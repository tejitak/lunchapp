/**
 * main
 */
(function(global) {
    "use strict";

    teji.getPackage("teji.lunch.main", new Vue({

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
            this.$on("fbOnLogin", function(res){
                console.log("Login! Listen in parent");
                console.log(res);
            });
            this.$on("fbOnLogout", function(res){
                console.log("Logout! Listen in parent");
                console.log(res);
            });
        },

        methods: {
        }
    }));

    window.fbAsyncInit = function() {
        teji.lunch.main.$broadcast("fbReady");
    };
})(window);