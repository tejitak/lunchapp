define(["backbone", "teji/lunch/model/Shop"], function(Backbone, Shop){
    var ShopCollection = Backbone.Collection.extend({

        model: Shop,

        initialize: function() {
        }

    });
    return ShopCollection;
});
