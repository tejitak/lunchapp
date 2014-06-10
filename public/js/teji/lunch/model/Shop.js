define(["backbone"], function(Backbone){
    var Shop = Backbone.Model.extend({

        defaults: {
            name: "",
            address: "",
            imageURL: ""
        },

        initialize: function(){
        },

        validate: function(attrs){
        }
    });
    return Shop;
});
