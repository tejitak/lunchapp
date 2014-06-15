define(["backbone", "underscore", "jquery", "text!./templates/ShopView.html"], function(Backbone, _, $, tmpl){
    var ShopView = Backbone.View.extend({

        tagName: "div",
        className: "flipsnapItem",
        template: _.template(tmpl),
        
        initialize: function() {
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$(".fnBtnVote").click($.proxy(this.model.vote, this.model));
            return this;
        }
    });
    return ShopView;
});