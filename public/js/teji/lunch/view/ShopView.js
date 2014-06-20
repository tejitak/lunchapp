define(["backbone", "underscore", "jquery", "text!./templates/ShopView.html"], function(Backbone, _, $, tmpl){
    var ShopView = Backbone.View.extend({

        tagName: "div",
        className: "flipsnapItem",
        template: _.template(tmpl),
        defaultImgURL: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjE1MCIgeT0iMTAwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE5cHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MzAweDIwMDwvdGV4dD48L3N2Zz4=",
        
        initialize: function() {
        },

        render: function() {
            var json = this.model.toJSON();
            // show default image when the image URL is not specified
            if(!json.imageURL){
                json.imageURL = this.defaultImgURL;
            }
            this.$el.html(this.template(json));
            this.$(".fnBtnVote").click($.proxy(this.model.vote, this.model));
            return this;
        }
    });
    return ShopView;
});