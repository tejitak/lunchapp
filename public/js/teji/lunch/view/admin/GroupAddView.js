define(["backbone", "underscore", "teji/lunch/util", "teji/lunch/fbInit", "text!./templates/GroupAddView.html"], function(Backbone, _, util, fbInit, tmpl){
    var GroupListView = Backbone.View.extend({

        template: _.template(tmpl),

        _currentModel: null,

        initialize: function() {
            this.render();
            this.$personResultContainer = this.$(".friendsAutoCompletedResults .multiColumn");

            // setup FB friends autocomplete
            fbInit.autoCompleteInit(this.$("#friendAutoCompleteInput"), this.$(".fnAddFriendAutoCompleteBtn"), $.proxy(function(personResult){
                // callback when member add button is clicked. Add a member if the member does not exist in current group
                if($.inArray(personResult.id, this._currentModel.get("members")) === -1){
                    fbInit.addAutoCompleteResult(this.$personResultContainer, personResult, $.proxy(this.onRemoveMember, this));
                    this._currentModel.get("members").push(personResult);
                }
            }, this));

            // attach event to add new group    
            this.$(".fnSaveAddGroupBtn").click($.proxy(function(){
                var groupName =  this.$("#groupNameInput").val();
                if(!this._currentModel || !groupName){
                    return;
                }
                this._currentModel.set("name", groupName);
                // TODO: to be changed
                var callback = function(){
                    location.href = "/admin";
                };
                this.collection.postGroup(this._currentModel, callback);
            }, this));

            // attach event to edit group
            this.$(".fnSaveEditGroupBtn").click($.proxy(function(){
                var groupName =  $("#groupNameInput").val();
                if(!this._currentModel || !groupName){
                    return;
                }
                this._currentModel.set("name", groupName);
                // TODO: to be changed
                var callback = function(){ location.href = "/admin"; };
                this.collection.updateGroup(this._currentModel, callback);
            }, this));

            // attach event to cancel add group
            this.$(".fnCancelSaveGroupBtn").click(function(){
                util.showPage(0);
            });
        },

        render: function(){
            this.$el.html(this.template({}));
        },

        updateView: function(groupModel, isEdit){
            this._currentModel = groupModel;
            // add class to change title and buttons for add and edit
            isEdit ? this.$el.addClass("editGroupModal") : this.$el.removeClass("editGroupModal");
            // update group name input
            this.$("#groupNameInput").val(groupModel.get("name"));
            // update members view
            this.$personResultContainer.empty();
            var members = groupModel.get("members") || [];
            _.each(members, $.proxy(function(member){
                fbInit.addAutoCompleteResult(this.$personResultContainer, member, $.proxy(this.onRemoveMember, this));
            }, this));
        },

        onRemoveMember: function(removeItem){
            var members = this._currentModel.get("members");
            if(removeItem && members && members.length){
                this._currentModel.set("members", $.grep(members, function(value) {
                    return value.id !== removeItem.id;
                }));
            }
        },

        clear: function(){

        },

        onEditGroup: function(){
            // for override
        },

        onDeleteGroup: function(){
            // for override
        }
    });
    return GroupListView;
});
