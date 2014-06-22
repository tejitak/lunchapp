define(["backbone", "underscore", "teji/lunch/util", "teji/lunch/model/Group", "text!./templates/GroupListView.html"], function(Backbone, _, util, Group, tmpl){
    var GroupListView = Backbone.View.extend({

        template: _.template(tmpl),

        initialize: function(options) {
            options = options || {};
            this._groupAddView = options.groupAddView;
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
            // bind onclick edit
            this.$(".fnGroupListViewEditBtn").bind("click", $.proxy(function($e){
                var $target = $($e.target);
                var groupId = $target.attr("data-group-id");
                // get detail from group models
                var targetModel = $.grep(models, function(model){
                    return model.get("_id") === groupId;
                })[0];
                util.showPage(1);
                var cloned = new Group(targetModel.toJSON());
                this._groupAddView.updateView(targetModel, true/*isEdit*/);
            }, this));
            // bind onclick delete
            this.$(".fnGroupListViewDeleteBtn").bind("click", function($e){
                var $target = $($e.target);
                var groupId = $target.attr("data-group-id");
                var targetModel = $.grep(models, function(model){
                    return model.get("_id") === groupId;
                })[0];
                if(targetModel && window.confirm("Are you sure you want to delete [" + targetModel.get("name") + "] ?")){
                    // TODO: to be changed
                    var callback = function(){ location.href = "/admin"; };
                    targetModel.deleteGroup(groupId, callback);
                }
            });
        },

        clear: function(){
            // unbind
            this.$("fnGroupListViewEditBtn").unbind("click");
            this.$("fnGroupListViewDeleteBtn").unbind("click");
            this.$el.empty();
        }
    });
    return GroupListView;
});
