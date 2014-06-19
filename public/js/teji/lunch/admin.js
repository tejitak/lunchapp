requirejs.config({
    baseUrl: "/js",
    paths: {
        "jquery": "lib/jquery/jquery",
        "jquery.autocomplete": "lib/jquery.autocomplete/jquery.autocomplete",
        "text": "lib/requirejs-text/text",
        "bootstrap": "lib/bootstrap/bootstrap",
        "backbone": "lib/backbone/backbone",
        "underscore": "lib/underscore/underscore",
        "velocity": "lib/velocity/jquery.velocity"
    },
    shim: {
        "jquery.autocomplete": {
            deps: ["jquery"]
        },
        "bootstrap": {
            deps: ["jquery"]
        },
        "bootstrap.timepicker": {
            deps: ["bootstrap"],
        },
        "backbone": {
            deps: ["underscore"]
        },
        "velocity": {
            deps: ["jquery"]
        }
    }
});

require(["jquery", 
    "jquery.autocomplete",
    "bootstrap",
    "velocity",
    "teji/lunch/fbInit",
    "teji/lunch/util",
    "teji/lunch/collection/GroupCollection",
    "teji/lunch/model/Group",
    "teji/lunch/view/admin/GroupListView",
    "teji/lunch/view/admin/GroupAddView"], function($, jqAutoComplete, bootstrap, velocity, fbInit, util, GroupCollection, Group, GroupListView, GroupAddView) {

    var mainPages = [".fnMainContainer", ".fnGroupAddView"];

    fbInit.loginSuccessCallback = function(response){
        // initialize views
        var groupCollection = new GroupCollection();
        var groupAddView = new GroupAddView({el: ".fnGroupAddView", collection: groupCollection});
        var groupListView = new GroupListView({el: ".fnGroupListView", collection: groupCollection, groupAddView: groupAddView});
        // initial load
        groupCollection.loadList();
        $(".fnDefaultContent").hide();
        $(".fnAdminGroupList").show();
        // attach event to open a new group modal dialog
        $('.fnAdminAddGroup').click(function(e){
            util.showPage(1);
            // clear view with a new model and me
            var newGroup = new Group({id: "", name: "", members: [{id: fbInit.me.id, name: fbInit.me.name}], shops: []});
            groupAddView.updateView(newGroup);
        });
    };
    fbInit.loginFailCallback = function(response){
        $(".fnDefaultContent").show();
        $(".fnAdminGroupList").hide();
    };
    fbInit.logoutCallback = function(){
        // $(".fnAdminGroupList").hide();
        // $(".fnDefaultContent").show();
        location.href = "/admin";
    };
    var fbOnLoadCallback = function(){
        // show main content
        util.showPage(0, mainPages)
    };
    fbInit.load(fbOnLoadCallback);
    // prevent keep opening dropdown after page load
    $('.dropdown-menu').dropdown('toggle');
});