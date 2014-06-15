define(["backbone", "jquery", "teji/lunch/model/Shop"], function(Backbone, $, Shop){
    var Group = Backbone.Model.extend({

        defaults: {
            id: "",
            name: "",
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
            // change json to Shop model
            this.set("shops", $.map(obj.shops, function(n, i){
                return new Shop(n);
            }));
        },

        validate: function(attrs){
        }
    });
    return Group;
});
