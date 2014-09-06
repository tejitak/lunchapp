define(["backbone", "jquery", "teji/lunch/model/Shop"], function(Backbone, $, Shop){
    var Group = Backbone.Model.extend({

        defaults: {
            state: "",
            decidedShop: "",
            id: "",
            name: "",
            lunchTime: "",
            timezone: "",
            members: [],
            shops: [],
            evernote: []
        },

        initialize: function(obj){
            if(!obj){ 
                // default will be used
                return;
            }
            obj.state = obj.state || "vote";
            obj.members = obj.members || [];
            obj.shops = obj.shops || [];
            obj.lunchTime = obj.lunchTime || "12:00";
            obj.timezone = obj.timezone || "Asia/Tokyo";
            obj.evernote = obj.evernote || [];
            // change json to Shop model
            this.set("shops", $.map(obj.shops, function(n, i){
                return new Shop(n);
            }));
        },

        validate: function(attrs){
        },

        getUniqueCategories: function(){
            var shops = this.get("shops");
            var categories = $.map(shops, function(shop){ return shop.get("category"); });
            var uniqueCategories = [];
            var countMap = {};
            $.each(categories, function(i, cat){
                if(!countMap[cat]){
                    countMap[cat] = 1;
                    uniqueCategories.push({name: cat});
                }else{
                    countMap[cat]++;
                }
            });
            $.each(uniqueCategories, function(i, obj){
                obj.count = countMap[obj.name];
            });
            return uniqueCategories;
        },

        addShop: function(shopModel){
            var shops = this.get("shops") || [];
            shops.push(shopModel);
            this.trigger("onUpdateShopModel");
        },

        deleteGroup: function(groupId, callback){
            $.ajax({type: "DELETE",
                url: lunch.constants.config.CONTEXT_PATH + "/api/group/" + groupId + "/?inputToken=" + fbInit.accessToken
            }).done($.proxy(function(response){
                if(callback){
                    callback();
                }
            }, this));
        },

        retriveShopInfo: function(shopURL, callback){
            $.ajax({type: "GET",
                url: lunch.constants.config.CONTEXT_PATH + "/api/shop/retrieve?inputToken=" + fbInit.accessToken + "&shopURL=" + shopURL
            }).done($.proxy(function(json){
                // create a new shop model from response
                if(!json.response || !json.response.rest){
                    return;
                }
                // obj is response of gurunabi API
                var shopModel = new Shop();
                shopModel.initWithTaberoguResponse(json.response.rest);
                if(callback){
                    callback(shopModel);
                }
            }, this));
        },

        getVotedShopId: function(userId){
            for(var i=0, len=this.get("shops").length; i<len; i++){
                var shop = this.get("shops")[i];
                if(shop.get("votedBy").indexOf(userId) != -1){
                        return shop.get("id");
                }
            }
            return;
        },

        vote: function(shopId, callback){
            $.ajax({type: "POST",
                url: lunch.constants.config.CONTEXT_PATH + "/api/vote",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({inputToken: fbInit.accessToken, groupId: this.get("_id"), shopId: shopId})
            }).done($.proxy(function(response){
                if(callback){
                    callback();
                }
            }, this));
        },

        undoVote: function(shopId, callback){
            $.ajax({type: "DELETE",
                url: lunch.constants.config.CONTEXT_PATH + "/api/vote",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({inputToken: fbInit.accessToken, groupId: this.get("_id"), shopId: shopId})
            }).done($.proxy(function(response){
                if(callback){
                    callback();
                }
            }, this));
        },

        shuffleResult: function(callback){
            $.ajax({type: "POST",
                url: lunch.constants.config.CONTEXT_PATH + "/api/shuffleResult",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({groupId: this.get("_id"), inputToken: fbInit.accessToken})
            }).done($.proxy(function(response){
                if(callback){
                    callback();
                }
            }, this));
        }
    });
    return Group;
});
