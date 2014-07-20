define(["backbone", "jquery"], function(Backbone, $){
    var Shop = Backbone.Model.extend({

        defaults: {
            id: "",
            name: "",
            category: "",
            address: "",
            tel: "",
            url: "",
            url_mobile: "",
            imageURL: "",
            rating: 0,
            visitedCount: 0,
            votedBy: [],
            en_gid: ""
        },

        initialize: function(obj){
        },

        initWithTaberoguResponse: function(result){
            // set values from taberog API response
            this.set("id", result["id"]);
            this.set("name", result["name"]);
            this.set("category", result["category"]);
            this.set("address", result["address"]);
            this.set("tel", result["tel"]);
            this.set("url", result["url"]);
            this.set("url_mobile", result["url_mobile"]);
            this.set("imageURL", result.image_url["shop_image1"] || "");
            this.set("votedBy", []);
            this.set("en_gid", "");
        },

        updateValues: function(shopInfo){
            $.each(shopInfo, $.proxy(function(key, value){
                this.set(key, value);
            }, this));
        },

        validate: function(attrs){
        },

        showInfo: function(){
            var isMobile = $(window).width() < 768;
            window.open(isMobile ? this.get('url_mobile') : this.get('url'));
        }
    });
    return Shop;
});
