define(["backbone", "jquery"], function(Backbone, $){
    var Shop = Backbone.Model.extend({

        defaults: {
            id: "",
            name: "",
            category: "",
            address: "",
            tel: "",
            url_mobile: "",
            imageURL: "",
            rating: 0,
            visitedCount: 0
        },

        initialize: function(){
        },

        initWithTaberoguResponse: function(result){
            // set values from taberog API response
            this.set("id", result["id"]);
            this.set("name", result["name"]);
            this.set("category", result["category"]);
            this.set("address", result["address"]);
            this.set("tel", result["tel"]);
            this.set("url_mobile", result["url_mobile"]);
            this.set("imageURL", result.image_url["shop_image1"] || "");
        },

        updateValues: function(shopInfo){
            $.each(shopInfo, $.proxy(function(key, value){
                this.set(key, value);
            }, this));
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
        },

        showInfo: function(){
            // TODO: set proper URL attribute. Right now using dummy attribue!!
            window.open(this.get('shopURL'));
        }
    });
    return Shop;
});
