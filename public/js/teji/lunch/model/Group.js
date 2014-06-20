define(["backbone", "jquery", "teji/lunch/model/Shop"], function(Backbone, $, Shop){
    var Group = Backbone.Model.extend({

        defaults: {
            id: "",
            name: "",
            lunchTime: "",
            members: [],
            shops: []
        },

        initialize: function(obj){
            if(!obj){ 
                // default will be used
                return;
            }
            obj.members = obj.members || [];
            obj.shops = obj.shops || [];
            obj.lunchTime = obj.lunchTime || "12:00";
            // change json to Shop model
            this.set("shops", $.map(obj.shops, function(n, i){
                return new Shop(n);
            }));
        },

        validate: function(attrs){
        },

        addShop: function(shopModel){
            var shops = this.get("shops") || [];
            shops.push(shopModel);
            this.trigger("onAddShopModel");
        },

        deleteGroup: function(groupId, callback){
            $.ajax({type: "DELETE",
                url: "/api/group/" + groupId + "/?inputToken=" + fbInit.accessToken
            }).done($.proxy(function(response){
                if(callback){
                    callback();
                }
            }, this));
        },

        retriveShopInfo: function(shopId, callback){
            $.ajax({type: "GET",
                url: "/api/shop/retrieve?inputToken=" + fbInit.accessToken + "&shopId=" + shopId
            }).done($.proxy(function(response){
                if(callback){
                    callback(response);
                }
            }, this));
        }
    });
    return Group;
});
