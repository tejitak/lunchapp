/**
 * Facebook login on header
 */
(function(global, util) {
    "use strict";

    var loginVm = teji.getPackage("teji.lunch.login", Vue.extend({

        template: '<div v-on="click: login">Facebook Login!</div>',

        data: {
            initialized: false,
            loggedIn: false
        },

        created: function() {
            var that = this;
            this.$on("fbReady", function(){
                that.init();
            })
        },

        methods: {
            init: function(){
                FB.init({
                    appId      : '1437481033176694',
                    xfbml      : true,
                    version    : 'v2.1'
                });
                this.initialized = true;

                var that = this;
                FB.getLoginStatus(function(response) {
                    that.statusChangeCallback(response);
                });
            },

            login: function(){
                var that = this;
                FB.login(function(response){
                    that.statusChangeCallback(response);
                    this.$dispatch("fbOnLogin", response);
                }, {scope: 'public_profile,user_friends'});
            },

            logout: function(){
                var that = this;
                FB.logout(function(response) {
                    that.statusChangeCallback(response);
                    that.$dispatch("fbOnLogout", response);
                });
            },

            statusChangeCallback: function(response) {
                var that = this;
                if(response.status === 'connected'){
                    console.log("logged In");
                    // show logged in user name and logout button
                    // $("#loginBtnMenu").css({display: "none"});
                    // $("#loginUserMenu").css({display: ""});
                    var that = this;
                    FB.api('/me', function(res) {
                        that.$parent.me = res;
                        // $('#dropDownLoginName').html(res.name);
                        // $('#loginUserImage').html(this.getImageHTML(res.id));
                    });
                    this.$parent.accessToken = response.authResponse.accessToken;
                    this.$parent.me = {id: response.authResponse.userID};
                    // if(this.loginSuccessCallback){
                    //     this.loginSuccessCallback(response);
                    // }
                }else{
                    console.log("logged fail!");
                    // show login button
                    // $("#loginBtnMenu").css({display: ""});
                    // $("#loginUserMenu").css({display: "none"});
                    // if(this.loginFailCallback){
                    //     this.loginFailCallback(response);
                    // }
                }
            }

            // checkLoginState: function(onLoadCallback) {
            //     FB.getLoginStatus($.proxy(function(response) {
            //         this.statusChangeCallback(response);
            //         this.$dispatch("fbLogin", response);
            //         // if(onLoadCallback){
            //         //     onLoadCallback();
            //         // }
            //     }, this));
            // }
        }
    }));

})(window, teji.lunch.util);