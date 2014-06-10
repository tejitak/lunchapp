define(["backbone", "teji/lunch/view/ShopView"], function(Backbone, ShopView){
    var ShopListView = Backbone.View.extend({

        initialize: function() {
            this.listenTo(this.collection, "add", this.addItem);
        },

        addItem: function(model) {
            var shopView = new ShopView({model: model});
            this.$el.append(shopView.render().el);
        }
    });
    return ShopListView;
});
