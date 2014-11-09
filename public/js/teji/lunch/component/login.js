/**
 * Facebook login on header
 */
(function(global) {
    "use strict";

    var Vue = require("vue");

    module.exports = Vue.extend({

        template: "#lunch-login-tmpl",

        data: function(){
            return {
                fbParam: {
                    appId      : '1437481033176694',
                    xfbml      : true,
                    version    : 'v2.1'
                }, 
                initialized: false,
                loggedIn: false
            };
        },

        created: function() {
            var that = this;
            this.$on("fbReady", function(){
                FB.init(this.fbParam);
                FB.getLoginStatus(function(response) {
                    that.statusChangeCallback(response);
                    that.initialized = true;
                });
            });
        },

        methods: {
            login: function(){
                var that = this;
                FB.login(function(response){
                    that.statusChangeCallback(response);
                }, {scope: 'public_profile,user_friends'});
            },

            logout: function(){
                var that = this;
                FB.logout(function(response) {
                    that.statusChangeCallback(response);
                });
            },

            statusChangeCallback: function(response) {
                var that = this;
                if(response.status === 'connected'){
                    FB.api('/me', function(res) {
                        that.$parent.me = res;
                    });
                    that.$parent.accessToken = response.authResponse.accessToken;
                    that.$parent.me = {id: response.authResponse.userID};
                    that.loggedIn = true;
                    that.$dispatch("fbOnLogin", response);                    
                }else{
                    that.loggedIn = false;
                    that.$dispatch("fbOnLogout", response);
                }
            }
        }
    });

})(window);