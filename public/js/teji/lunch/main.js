requirejs.config({
    baseUrl: "/js",
    paths: {
        "jquery": "lib/jquery/jquery",
        "text": "lib/requirejs-text/text",
        "bootstrap": "lib/bootstrap/bootstrap",
        "backbone": "lib/backbone/backbone",
        "underscore": "lib/underscore/underscore",
        "flipsnap":  "lib/flipsnap/flipsnap",
        "velocity": "lib/velocity/jquery.velocity"
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
        },
        "velocity": {
            deps: ["jquery"]
        }
    }
});

require([
    "jquery",
    "bootstrap",
    "velocity",
    "teji/lunch/fbInit",
    "teji/lunch/util",
    "teji/lunch/view/ShopListView",
    "teji/lunch/collection/GroupCollection"], function($, bootstrap, velocity, fbInit, util, ShopListView, GroupCollection) {

        var mainPages = [".fnMainContainer"];
        // initialize views
        var groupCollection = new GroupCollection();
        var shopListView = new ShopListView({el: ".fnResultViewList", collection: groupCollection});
        // set callback for initial FB sdk load and <fb:login-button>
        fbInit.loginSuccessCallback = function(response){
            // initial load
            groupCollection.loadList();
            $(".fnDefaultContent").hide();
            $(".fnMainContent").show();
        };
        fbInit.loginFailCallback = function(response){
            $(".fnDefaultContent").show();
            $(".fnMainContent").hide();
        };
        fbInit.logoutCallback = function(){
            shopListView.clearView();
            $(".fnDefaultContent").show();
            $(".fnMainContent").hide();
        };
        var fbOnLoadCallback = function(){
            // show main content
            util.showPage(mainPages, 0);
        };
        fbInit.load(fbOnLoadCallback);
        // prevent keep opening dropdown after page load
        $('.dropdown-menu').dropdown('toggle');
});