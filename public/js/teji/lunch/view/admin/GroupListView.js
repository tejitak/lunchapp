define(["backbone", "underscore", "teji/lunch/util", "text!./templates/GroupListView.html"], function(Backbone, _, util, tmpl){
    var GroupListView = Backbone.View.extend({

        template: _.template(tmpl),

        initialize: function() {
            this.listenTo(this.collection, "addCollection", this.addItems);
        },

        addItems: function(models){
            models = models || [];
            // clear node
            this.clear();
            this._renderItems(models);
        },

        _renderItems: function(models){
            var groupsJson = $.map(models, function(model){ return model.toJSON(); });
            this.$el.html(this.template({groups: groupsJson}));
            // bind
            var _groupCollection = this.collection;
            this.$(".fnGroupListViewEditBtn").bind("click", function($e){
                var $target = $($e.target);
                var groupId = $target.attr("data-group-id");
                // get detail from group models
                var targetModel = $.grep(models, function(model){
                    return model.get("_id") === groupId;
                })[0];
                console.log(targetModel);
                util.showPage(1);
                // add class to change title and buttons
                var $dlg = $(".fnAddGroupModal").addClass("editGroupModal");
                // set group name
                $("#groupNameInput").val(targetModel.get("name"));
                // set members
                var $personResultContainer = $(".friendsAutoCompletedResults .multiColumn");
                $personResultContainer.empty();
                var members = targetModel.get("members") || [];
                // TODO: add remove callback
                _.each(members, function(member){
                    fbInit.addAutoCompleteResult($personResultContainer, member);
                });

                // attach event to edit group
                $(".fnSaveEditGroupBtn").click(function(){
                    var groupName =  $("#groupNameInput").val();
                    if(!targetModel || !groupName){
                        return;
                    }
                    targetModel.set("name", groupName);
                    // TODO: to be changed
                    var callback = function(){
                        location.href = "/admin";
                    };
                    // TODO: update members

                    _groupCollection.updateGroup(targetModel, callback);
                });
            });
            this.$(".fnGroupListViewDeleteBtn").bind("click", function($e){
                var $target = $($e.target);
                var groupId = $target.attr("data-group-id");
                var targetModel = $.grep(models, function(model){
                    return model.get("_id") === groupId;
                })[0];
                if(targetModel && window.confirm("Are you sure you want to delete [" + targetModel.get("name") + "] ?")){
                    // TODO: to be changed
                    var callback = function(){
                        location.href = "/admin";
                    };
                    targetModel.deleteGroup(groupId, callback);
                }
            });
        },

        clear: function(){
            this.$el.empty();
            // unbind
            this.$("fnGroupListViewEditBtn").unbind("click");
            this.$("fnGroupListViewDeleteBtn").unbind("click");
        }
    });
    return GroupListView;
});
