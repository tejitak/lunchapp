requirejs.config({
    baseUrl: "/js",
    paths: {
        "jquery": "lib/jquery/jquery",
        "jquery.autocomplete": "lib/jquery.autocomplete/jquery.autocomplete",
        "text": "lib/requirejs-text/text",
        "bootstrap": "lib/bootstrap/bootstrap",
        "backbone": "lib/backbone/backbone",
        "underscore": "lib/underscore/underscore"
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
        }
    }
});

require(["jquery", 
    "jquery.autocomplete",
    "bootstrap",
    "teji/lunch/fbInit",
    "teji/lunch/collection/GroupCollection",
    "teji/lunch/model/Group"], function($, jqAutoComplete, bootstrap, fbInit, GroupCollection, Group) {

    var groupCollection = new GroupCollection();

    fbInit.loginSuccessCallback = function(response){
        // initial load
        groupCollection.loadList();
        $(".fnDefaultContent").hide();
        $(".fnGroupList").show();
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
            fbInit.addAutoCompleteResult($(".friendsAutoCompletedResults .multiColumn"), personResult, removeMemberCallback);
            newGroup.get("members").push(personResult);
        });
        // attach event to open a new group modal dialog
        $('#addGroupModal').on('show.bs.modal', function(e){
            // clear values
            newGroup = new Group({id: "", name: "", members: [], shops: []});
            var personResult = {id: fbInit.me.id, name: fbInit.me.name};
            var $resultContainer = $(".friendsAutoCompletedResults .multiColumn");
            $resultContainer.empty();
            fbInit.addAutoCompleteResult($resultContainer, personResult);
            newGroup.get("members").push(personResult);
        });
        // attach event to save group    
        $(".fnSaveGroupBtn").click(function(){
            var groupName =  $("#groupNameInput").val();
            if(!newGroup || !groupName){
                return;
            }
            newGroup.set("name", groupName);
            var callback = function(){
                location.href = "/admin";
            };
            groupCollection.postGroup(newGroup, callback);
            // TODO: for edit
            // groupCollection.putGroup(params);
        });
    };
    fbInit.loginFailCallback = function(response){
        $(".fnDefaultContent").show();
        $(".fnGroupList").hide();
    };
    fbInit.logoutCallback = function(){
        $(".fnGroupList").hide();
        $(".fnDefaultContent").show();
    };
    fbInit.load();
    // prevent keep opening dropdown after page load
    $('.dropdown-menu').dropdown('toggle');
});