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
            visitedCount: 0,
            votedBy: []
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
            this.set("votedBy", []);
        },

        updateValues: function(shopInfo){
            $.each(shopInfo, $.proxy(function(key, value){
                this.set(key, value);
            }, this));
        },

        validate: function(attrs){
        },

        showInfo: function(){
            // TODO: set proper URL attribute. Swicth URL for mobile and PC.
            window.open(this.get('url_mobile'));
        }
    });
    return Shop;
});
