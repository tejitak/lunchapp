define(["backbone", "underscore", "teji/lunch/util", "teji/lunch/fbInit", "text!./templates/GroupAddView.html", "text!./templates/ShopListTable.html", "teji/lunch/model/Shop"], function(Backbone, _, util, fbInit, tmpl, shopListTableTmpl, Shop){
    var GroupListView = Backbone.View.extend({

        ADD_SHOP_INPUT_KEYS: ["id", "name", "category", "address", "tel", "imageURL", "url_mobile"],

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

            // attach event to retrive shop information via external API
            this.$(".fnGetShopInfoBtn").click($.proxy(function(){
                var url = this.$(".fnGetShopURLInput").val();
                // get id from URL like "http://r.gnavi.co.jp/g910404/".split("/")[3]
                var shopId = url.split("/")[3];
                if(!shopId){
                    // TODO: show no result
                    return;
                }
                var callback = $.proxy(function(json){
                    // TODO: hide loading
                    console.log(json);
                    if(!json.response || !json.response.rest){
                        // TODO: show no result
                        return;
                    }
                    // obj is response of gurunabi API
                    var result = json.response.rest;
                    // set values
                    for(var i=0, len=this.ADD_SHOP_INPUT_KEYS.length; i<len; i++){
                        var key = this.ADD_SHOP_INPUT_KEYS[i];
                        var $input = this.$("#addShopInput_" + key);
                        var value = result[key];
                        if(key == "imageURL"){
                            value = result.image_url["shop_image1"] || "";
                        }
                        $input.val(value);
                    }
                }, this);
                // TODO: show loading
                this._currentModel.retriveShopInfo(shopId, callback);
            }, this));
            // attach event to add a restaurant
            this.$(".fnModalAddShopBtn").click($.proxy(function(){
                var obj = {};
                for(var i=0, len=this.ADD_SHOP_INPUT_KEYS.length; i<len; i++){
                    var key = this.ADD_SHOP_INPUT_KEYS[i];
                    var $input = this.$("#addShopInput_" + key);
                    obj[key] = $input.val();
                }
                // create a shop model from input form
                var shop = new Shop(obj);
                // trigger onAddShopModel
                this._currentModel.addShop(shop);
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
            this.$(".fnCancelSaveGroupBtn").click(function(){
                util.showPage(0);
            });
        },

        render: function(){
            this.$el.html(this.template({}));
        },

        updateView: function(groupModel, isEdit){
            this._currentModel = groupModel;
            // listen model
            this.listenTo(groupModel, "onAddShopModel", this._onAddShopModel);
            // add class to change title and buttons for add and edit
            isEdit ? this.$el.addClass("editGroupModal") : this.$el.removeClass("editGroupModal");
            // update group name input
            this.$("#groupNameInput").val(groupModel.get("name"));
            this.$("#groupLunchTimeInput").val(groupModel.get("lunchTime"));
            // update members view
            this.$personResultContainer.empty();            
            var members = groupModel.get("members") || [];
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

        _onAddShopModel: function(){
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
            // attach event
            this.$(".fnShopListTableEditBtn").click($.proxy(function($e){
                // TODO
            }, this));
            this.$(".fnShopListTableDeleteBtn").click($.proxy(function($e){
                var $target = $($e.target);
                var shopId = $target.attr("data-shop-id");
                var shopModels = this._currentModel.get("shops");
                var targetModel = $.grep(shopModels, function(model){
                    return model.get("id") === shopId;
                })[0];
                if(targetModel && window.confirm("Are you sure you want to delete [" + targetModel.get("name") + "] ?")){
                    // remove from array
                    // TOOD: should be handled in model?
                    shopModels.splice($.inArray(targetModel, shopModels), 1);
                    this.renderShopListTable();
                }
            }, this));
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
