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
    "teji/lunch/view/admin/GroupListView"], function($, jqAutoComplete, bootstrap, velocity, fbInit, util, GroupCollection, Group, GroupListView) {

    var mainPages = [".fnMainContainer", ".fnAddGroupModal"];
    var groupCollection = new GroupCollection();
    var groupListView = new GroupListView({el: ".fnGroupListView", collection: groupCollection});

    fbInit.loginSuccessCallback = function(response){
        // initial load
        groupCollection.loadList();
        $(".fnDefaultContent").hide();
        $(".fnAdminGroupList").show();
        // setup FB friends autocomplete
        var newGroup;
        fbInit.autoCompleteInit($("#friendAutoCompleteInput"), $(".fnAddFriendAutoCompleteBtn"), function(personResult){
            // callback when add button is clicked
            var removeMemberCallback = function(removeItem){
                var members = newGroup.get("members");
                if(removeItem && members && members.length){
                    newGroup.set("members", $.grep(members, function(value) {
                        return value.id !== removeItem.id;
                    }));
                }
            };
            if($.inArray(personResult.id, newGroup.get("members")) != -1){
                fbInit.addAutoCompleteResult($(".friendsAutoCompletedResults .multiColumn"), personResult, removeMemberCallback);
                newGroup.get("members").push(personResult);
            }
        });
        // attach event to open a new group modal dialog
        $('.fnAdminAddGroup').click(function(e){
            util.showPage(1);
            $(".fnAddGroupModal").removeClass("editGroupModal").show().velocity({opacity: 1})
            // clear model
            newGroup = new Group({id: "", name: "", members: [], shops: []});
            // clear group name
            $("#groupNameInput").val("");
            // clear members
            var personResult = {id: fbInit.me.id, name: fbInit.me.name};
            var $personResultContainer = $(".friendsAutoCompletedResults .multiColumn");
            $personResultContainer.empty();
            fbInit.addAutoCompleteResult($personResultContainer, personResult);
            newGroup.get("members").push(personResult);
        });
        // attach event to add new group    
        $(".fnSaveAddGroupBtn").click(function(){
            var groupName =  $("#groupNameInput").val();
            if(!newGroup || !groupName){
                return;
            }
            newGroup.set("name", groupName);
            // TODO: to be changed
            var callback = function(){
                location.href = "/admin";
            };
            groupCollection.postGroup(newGroup, callback);
            // groupCollection.putGroup(params);
        });
        // attach event to cancel add group
        $(".fnCancelSaveGroupBtn").click(function(){
            util.showPage(0);
        });
    };
    fbInit.loginFailCallback = function(response){
        $(".fnDefaultContent").show();
        $(".fnAdminGroupList").hide();
    };
    fbInit.logoutCallback = function(){
        $(".fnAdminGroupList").hide();
        $(".fnDefaultContent").show();
    };
    var fbOnLoadCallback = function(){
        // show main content
        util.showPage(0, mainPages)
    };
    fbInit.load(fbOnLoadCallback);
    // prevent keep opening dropdown after page load
    $('.dropdown-menu').dropdown('toggle');
});