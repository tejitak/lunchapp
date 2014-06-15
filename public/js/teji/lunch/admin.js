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
        $("#friendAutoCompleteInput").autocomplete("https://graph.facebook.com/me/friends?access_token=" + fbInit.accessToken + "&callback=?", {
            width: 250,
            height: 400,
            max: 10,
            dataType: 'jsonp',
            cacheLength: 10,
            minChars: 1,

            parse: function (data) {
                console.log(data);
                var rows = new Array();
                data = data.data;
                for (var i=0; i<data.length; i++) {
                    rows[i] = {data: data[i], value: data[i].name, result: data[i].name};
                }
                return rows;
            },
            
            formatItem: function (data, i, n, value, text, a, b, c, d) {
                var html = "<div class='fbFriendAutoCompleteItem'>" + fbInit.getImageHTML(data.id) + "<span>" + data.name + "</span></div>";
                return html;
            }
        }).result(function (evnet, item) {
            alert(item.id);
        });
        // attach event to open a new group modal dialog
        var newGroup;
        $('#addGroupModal').on('show.bs.modal', function(e){
            // TODO: clear values
            newGroup = new Group({id: "", name: "", members: [], shops: []});
            var $resultContainer = $(".friendsAutoCompletedResults .multiColumn");
            $resultContainer.empty();
            // add me as a member
            var me = fbInit.me;
            $div = $("<div></div>").addClass("userContent");
            $img = $(fbInit.getImageHTML(me.id));
            $a = $("<a></a>").attr("href", me.link).attr("target", "_blank").html(me.name);
            $deleteNode = $("<span></span>").addClass("deleteIcon").html("x");
            $div.append($img).append($a).append($deleteNode);
            var $li = $("<li></li>").addClass("userPresentation").append($div);
            $resultContainer.append($li);
            newGroup.get("members").push({id: me.id, name: me.name});
        });
        // attach event to save group    
        $(".fnSaveGroupBtn").click(function(){
            var groupName =  $("#groupNameInput").val();
            if(!newGroup || !groupName){
                return;
            }
            newGroup.set("name", groupName);
            var callback = function(){
                // reload data
                // TODO: render with view
                location.href = "/admin"
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