requirejs.config({
    baseUrl: "/js",
    paths: {
        "jquery": "lib/jquery/jquery",
        "text": "lib/requirejs-text/text",
        "bootstrap": "lib/bootstrap/bootstrap",
        "backbone": "lib/backbone/backbone",
        "underscore": "lib/underscore/underscore",
        "flipsnap":  "lib/flipsnap/flipsnap"
    },
    shim: {
       "bootstrap": {
            deps: ["jquery"]
        },
        "backbone": {
            deps: ["underscore"]
        },
        "flipsnap": {
            exports: 'Flipsnap'
        }
    }
});

require([
    "jquery",
    "bootstrap",
    "teji/lunch/view/ShopListView",
    "teji/lunch/collection/ShopCollection"], function($, bootstrap, ShopListView, ShopCollection) {
        // initialize views
        var shopCollection = new ShopCollection();
        var shopListView = new ShopListView({el: ".fnResultViewList", collection: shopCollection});
        // temp to call function from <fb:login-button> onlogin
        window.fbLoginSuccessCallback = function(response){
            console.log(response);
            // initial load
            shopCollection.loadList(response.authResponse);
            $(".fnDefaultContent").hide();
        };
        window.fbLogoutCallback = function(){
            shopListView.clearView();
            $(".fnDefaultContent").show();
        };
        // initial login check
        // fbCheckLoginState();
        // TODO: temp to async error
        setTimeout(fbCheckLoginState, 25);
        // prevent keep opening dropdown after page load
        $('.dropdown-menu').dropdown('toggle');
});