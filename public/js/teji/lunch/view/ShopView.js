define(["backbone", "underscore", "text!./templates/ShopView.html"], function(Backbone, _, tmpl){
    var ShopView = Backbone.View.extend({

        tagName: "div",
        className: "flipsnapItem",
        template: _.template(tmpl),
        
        initialize: function() {
        },

        render: function() {
            var json = this.model.toJSON();
            this.$el.html(this.template(json));
            this.$("fnBtnVote").click($.proxy(this.vote, this));
            return this;
        },

        vote: function(){
            var json = this.model.toJSON();
            var shopId = json.shopId;
            $.ajax({type: "POST",
                url: "/api/vote?inputToken=" + fbInit.accessToken,
                contentType: "application/json"
                data: {shopId: shopId}
            }).done($.proxy(function(response){
                // TODO: 
            }, this));

        }
    });
    return ShopView;
});
