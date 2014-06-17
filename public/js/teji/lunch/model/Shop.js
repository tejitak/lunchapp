define(["backbone", "jquery"], function(Backbone, $){
    var Shop = Backbone.Model.extend({

        defaults: {
            id: "",
            name: "",
            address: "",
            url: "",
            imageURL: ""
        },

        initialize: function(){
        },

        validate: function(attrs){
        },

        vote: function(callback){
            $.ajax({type: "POST",
                url: "/api/vote",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({inputToken: fbInit.accessToken, shopId: this.attributes.id})
            }).done($.proxy(function(response){
                // TODO: 
                console.log(response);
                if(callback){
                    callback();
                }
            }, this));
        }
    });
    return Shop;
});
