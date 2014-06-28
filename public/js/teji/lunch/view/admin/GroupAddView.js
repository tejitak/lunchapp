define([
    "backbone",
    "underscore",
    "bootstrap.sortable",
    "teji/lunch/util",
    "teji/lunch/fbInit",
    "text!./templates/GroupAddView.html",
    "text!./templates/ShopListTable.html",
    "teji/lunch/model/Shop"], function(Backbone, _, sortalble, util, fbInit, tmpl, shopListTableTmpl, Shop){
    
    var GroupListView = Backbone.View.extend({

        ADD_SHOP_INPUT_KEYS: ["id", "name", "category", "address", "tel", "imageURL", "url_mobile", "visitedCount"],

        template: _.template(tmpl),
        shopListTableTemplate: _.template(shopListTableTmpl),

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

            // modal dialog
            this.$(".addShopModalBtn").click($.proxy(function(){
                this.clearAddShopModal();
                this.$("#addShopModal").removeClass("isEdit").modal("show");
            }, this));

            // attach event to retrive shop information via external API
            this.$(".fnGetShopInfoBtn").click($.proxy(function(){
                var url = this.$(".fnGetShopURLInput").val();
                if(!url){
                    // TODO: show no result
                    return;
                }
                var callback = $.proxy(function(shopModel){
                    // TODO: hide loading
                    // TODO: show no result
                    this.updateAddShopModalByModel(shopModel);
                }, this);
                // TODO: show loading
                this._currentModel.retriveShopInfo(url, callback);
            }, this));

            // attach event to add a restaurant
            this.$(".fnModalAddShopBtn").click($.proxy(function(){
                // trigger onUpdateShopModel
                var shopInfo = this.createShopInfoFromInputs();
                this._currentModel.addShop(new Shop(shopInfo));
                this.$("#addShopModal").modal('hide')
            }, this));

            // attach event to edit a restaurant
            this.$(".fnModalEditShopBtn").click($.proxy(function(){
                var targetId = this.$("#addShopModal").data("target-shop-id");
                var targetShopModel = $.grep(this._currentModel.get("shops"), function(shopModel) {
                    return shopModel.cid === targetId;
                })[0];
                if(targetShopModel){
                    targetShopModel.updateValues(this.createShopInfoFromInputs());
                    this.renderShopListTable();
                }
                this.$("#addShopModal").modal('hide')
            }, this));

            // attach event to add new group    
            this.$(".fnSaveAddGroupBtn").click($.proxy(function(){
                var result = this.updateModelByUI();
                if(result.hasError){
                    // TODO: show error message with model validate
                    return;
                }
                // TODO: to be changed
                var callback = function(){ location.href = "/admin"; };
                this.collection.postGroup(result.model, callback);
            }, this));

            // attach event to edit group
            this.$(".fnSaveEditGroupBtn").click($.proxy(function(){
                var result = this.updateModelByUI();
                if(result.hasError){
                    // TODO: show error message with model validate
                    return;
                }
                // TODO: to be changed
                var callback = function(){ location.href = "/admin"; };
                this.collection.updateGroup(result.model, callback);
            }, this));

            // attach event to cancel add group
            this.$(".fnCancelSaveGroupBtn").click($.proxy(function(){
                // refresh group list view
                this.collection.loadList();
                util.showPage(0);
            }, this));
        },

        createShopInfoFromInputs: function(){
            var info = {};
            for(var i=0, len=this.ADD_SHOP_INPUT_KEYS.length; i<len; i++){
                var key = this.ADD_SHOP_INPUT_KEYS[i];
                var $input = this.$("#addShopInput_" + key);
                info[key] = $input.val();
                if(key == "visitedCount"){
                    info[key] = info[key] - 0;
                }
            }
            // If no ID was assigned, create one!
            if(!info["id"]){
                info["id"]= 'id'+ (new Date()).getTime();
            }
            return info;
        },

        render: function(){
            this.$el.html(this.template({}));
        },

        updateView: function(groupModel, isEdit){
            var targetModel = this._currentModel = groupModel;
            // listen model
            this.listenTo(targetModel, "onUpdateShopModel", this._onUpdateShopModel);
            // add class to change title and buttons for add and edit
            isEdit ? this.$(".addGroupModal").addClass("isEdit") : this.$(".addGroupModal").removeClass("isEdit");
            // update group name input
            this.$("#groupNameInput").val(targetModel.get("name"));
            this.$("#groupLunchTimeInput").val(targetModel.get("lunchTime"));
            // update members view
            this.$personResultContainer.empty();            
            var members = targetModel.get("members") || [];
            _.each(members, $.proxy(function(member){
                fbInit.addAutoCompleteResult(this.$personResultContainer, member, $.proxy(this.onRemoveMember, this));
            }, this));
            // update shop list table view
            this.renderShopListTable();
        },

        updateModelByUI: function(){
            var result = {};
            var model = result.model = this._currentModel;
            var groupName =  this.$("#groupNameInput").val();
            if(!this._currentModel || !groupName){
                result.hasError = true;
                return result;
            }
            model.set("name", groupName);
            model.set("lunchTime", $("#groupLunchTimeInput").val());
            return result;
        },

        onRemoveMember: function(removeItem){
            var members = this._currentModel.get("members");
            if(removeItem && members && members.length){
                this._currentModel.set("members", $.grep(members, function(value) {
                    return value.id !== removeItem.id;
                }));
            }
        },

        _onUpdateShopModel: function(){
            // refresh table
            this.renderShopListTable();
        },

        renderShopListTable: function(){
            var $table = this.$(".fnAdminShopListTable");
            $table.empty();
            var shopsJson = $.map(this._currentModel.get("shops"), function(shopModel){
                return shopModel.toJSON();
            });
            $table.html(this.shopListTableTemplate({shops: shopsJson}));
            // enable sort
            $.bootstrapSortable();
            // attach event for edit button
            this.$(".fnShopListTableEditBtn").click($.proxy(function($e){
                this.clearAddShopModal();
                var targetModel = this._getShopModelByNode($($e.target));
                this.$("#addShopModal").addClass("isEdit").modal("show").data("target-shop-id", targetModel.cid);
                this.updateAddShopModalByModel(targetModel);
            }, this));
            // attach event for delete button
            this.$(".fnShopListTableDeleteBtn").click($.proxy(function($e){
                var targetModel = this._getShopModelByNode($($e.target));
                if(targetModel && window.confirm("Are you sure you want to delete [" + targetModel.get("name") + "] ?")){
                    // remove from array
                    var shopModels = this._currentModel.get("shops");
                    // TOOD: should be handled in model?
                    shopModels.splice($.inArray(targetModel, shopModels), 1);
                    this.renderShopListTable();
                }
            }, this));
        },

        _getShopModelByNode: function($target){
            var shopId = $target.attr("data-shop-id");
            var shopModels = this._currentModel.get("shops");
            return $.grep(shopModels, function(model){
                return model.get("id") === shopId;
            })[0];
        },

        clearAddShopModal: function(){
            this.$(".fnGetShopURLInput").val("");
            for(var i=0, len=this.ADD_SHOP_INPUT_KEYS.length; i<len; i++){
                var key = this.ADD_SHOP_INPUT_KEYS[i];
                var blankValue = "";
                if(key == "visitedCount"){
                    blankValue = 0;
                }
                this.$("#addShopInput_" + key).val(blankValue);
            }
        },

        updateAddShopModalByModel: function(shopModel){
            for(var i=0, len=this.ADD_SHOP_INPUT_KEYS.length; i<len; i++){
                var key = this.ADD_SHOP_INPUT_KEYS[i];                
                this.$("#addShopInput_" + key).val(shopModel.get(key));
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
