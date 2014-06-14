define(["backbone", "underscore", "teji/lunch/view/ShopView", "flipsnap"], function(Backbone, _, ShopView, flipsnap){
    var ShopListView = Backbone.View.extend({

        initialize: function() {
            this.listenTo(this.collection, "addCollection", this.addItems);
            this.$viewTitle = $(".fnResultViewTitle");
        },

        addItems: function(models){
            models = models || [];
            // clear node
            this._clear();
            // show title
            this.$viewTitle.show();
            var w = (models.length * 220/*item width*/) + 95/* padding */;
            var $node = this._renderItems(models).addClass("flipsnap").width(w + "px");
            this.$el.append($node);
            flipsnap('.flipsnap', {distance: 230});
        },

        _renderItems: function(models){
            var $div = $("<div></div>");
            _.each(models, function(model){
                var shopView = new ShopView({model: model});
                var el = shopView.render().el;
                $div.append(el);
            }, this);
            return $div;
        },
        
        _clear: function(){
            this.$el.empty();
        },

        clearView: function(){
            this._clear();
            // show default screen
            this.$viewTitle.hide();
        }
    });
    return ShopListView;
});
