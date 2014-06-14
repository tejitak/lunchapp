define(["jquery"], function($){

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1437481033176694',
            cookie     : true, 
            xfbml      : true,
            version    : 'v2.0'
        });
        $("#fb-root").trigger("facebook:init");
    };

    var fbInit = window.fbInit = {

        accessToken: "",
        loginSuccessCallback: null,
        loginFailCallback: null,
        logoutSuccesCallback: null,

        load: function(){
            // load sdk
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            // call initial login check after facebook sdk is loaded
            $("#fb-root").bind("facebook:init", $.proxy(function() {
                this.checkLoginState();
            }, this));
        },

        statusChangeCallback: function(response) {
            if (response.status === 'connected') {
                // show logged in user name and logout button
                $("#loginBtnMenu").css({display: "none"});
                $("#loginUserMenu").css({display: ""});
                FB.api('/me', function(response) {
                    $('#dropDownLoginName').html(response.name);
                });
                if(this.loginSuccessCallback !== "undefined"){
                    this.loginSuccessCallback(response);
                }
            }else{
                // show login button
                $("#loginBtnMenu").css({display: ""});
                $("#loginUserMenu").css({display: "none"});
                if(this.loginFailCallback){
                    this.loginFailCallback(response);
                }
            }
        },

        checkLoginState: function() {
            FB.getLoginStatus($.proxy(function(response) {
                this.statusChangeCallback(response);
            }, this));
        },

        logout: function(){
            FB.logout($.proxy(function(response) {
                this.statusChangeCallback(response);
                if(this.logoutCallback){
                    this.logoutCallback(response);
                }
            }, this));
        }
    };
    return fbInit;
});