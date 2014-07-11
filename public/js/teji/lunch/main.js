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
    "teji/lunch/collection/GroupCollection"], function($, bootstrap, velocity, fbInit, util, ShopListView, GroupCollection) {

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
        // setup evernote
        $(".fnEvernoteReminderUpdateBtn").click(function(){
            var votingTimeReminder = $("#evernote_votingTime_reminder_checkbox").is(':checked');
            var resultTimeReminder = $("#evernote_resultTime_reminder_checkbox").is(':checked');
            $.ajax({type: "POST",
                url: lunch.constants.config.CONTEXT_PATH + "/evernote/reminder",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({
                    url: location.href,
                    votingTimeReminder: votingTimeReminder,
                    resultTimeReminder: resultTimeReminder
                })
            }).done($.proxy(function(response){
                location.href = lunch.constants.config.CONTEXT_PATH + "/";
            }, this));
        });
    };
    fbInit.loginFailCallback = function(response){
        $(".fnDefaultContent").show();
        $(".fnMainContent").hide();
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