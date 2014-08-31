requirejs.config({
    baseUrl: "./js",
    paths: {
        "jquery": "lib/jquery/jquery",
        "jquery.cookie": "lib/jquery.cookie/jquery.cookie",
        "text": "lib/requirejs-text/text",
        "bootstrap": "lib/bootstrap/bootstrap",
        "backbone": "lib/backbone/backbone",
        "underscore": "lib/underscore/underscore",
        "flipsnap":  "lib/flipsnap/flipsnap",
        "velocity": "lib/velocity/jquery.velocity",
        "facebook": "//connect.facebook.net/en_US/all",
        "moment": "lib/moment/moment",
        "moment.timzone": "lib/moment-timezone/moment-timezone-with-data-2010-2020"
    },
    shim: {
        "jquery.cookie": {
            deps: ["jquery"]
        },
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
        },
        "facebook": {
            exports: "FB"
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
    "teji/lunch/view/PopularShopsView",
    "teji/lunch/collection/GroupCollection"], function($, bootstrap, velocity, fbInit, util, ShopListView, PopularShopsView, GroupCollection) {

    var mainPages = [".fnMainContainer"];
    // set callback for initial FB sdk load and <fb:login-button>
    fbInit.loginSuccessCallback = function(response){
        // initialize views
        var groupCollection = new GroupCollection();
        var shopListView = new ShopListView({el: ".fnResultViewList", collection: groupCollection});
        // initial load
        groupCollection.loadList();
        $(".fnDefaultContent").hide();
        $(".fnMainContent").show();
        $(".fnPopularList").hide();
    };
    fbInit.loginFailCallback = function(response){
        $(".fnDefaultContent").show();
        $(".fnMainContent").hide();
        var popularShopsView = new PopularShopsView({el: ".fnPopularList"});
        // Initial load
       popularShopsView.render();
//        this.$el.append(popularShopsView.render().$el);
        $(".fnPopularList").show();
    };
    fbInit.logoutCallback = function(){
        location.href = lunch.constants.config.CONTEXT_PATH + "/";
    };
    fbInit.checkLoginState(function(){
        // initial callback to show main content
        util.showPage(0, mainPages);
    });
    // prevent keep opening dropdown after page load
    $('.dropdown-menu').dropdown('toggle');
});