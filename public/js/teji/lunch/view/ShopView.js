define(["backbone", "underscore", "text!./templates/ShopView.html"], function(Backbone, _, tmpl){
    var ShopView = Backbone.View.extend({

        tagName: "div",
        className: "col-sm-6 col-md-4",
        template: _.template(tmpl),
        
        initialize: function() {
        },

        render: function() {
            var json = this.model.toJSON();
            this.$el.html(this.template(json));
            return this;
        }
    });
    return ShopView;
});
