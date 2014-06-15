define(["backbone", "underscore", "teji/lunch/view/ShopView", "flipsnap"], function(Backbone, _, ShopView, flipsnap){
    var ShopListView = Backbone.View.extend({

        initialize: function() {
            this.listenTo(this.collection, "addCollection", this.addItems);
            this.$viewTitle = $(".fnResultViewTitle");
            this.$groupSelect = $(".fnGroupSelect");
        },

        addItems: function(models){
            models = models || [];
            // clear node
            this._clear();
            if(models.length == 0){
                // show no groups messages
                this.$el.append($('<div class="alert alert-info"></div>').html("No Groups - Please create a new group or join to an existing group."));
            }else{
                this._renderGroup(models[0]);
                // show group selector
                for(var i=0, len=models.length; i<len; i++){
                    $("<option></option>").val(i).html(models[i].get("name")).appendTo(this.$groupSelect);
                }
                this.$groupSelect.change($.proxy(function(){
                    this._clear();
                    this._renderGroup(models[this.$groupSelect.val()]);
                }, this));
            }
        },

        _renderGroup: function(model){
            // show title
            this.$viewTitle.show();
            var shops = model.get("shops"), len = shops.length;
            if(len == 0){
                this.$el.append($('<div class="alert alert-info"></div>').html("There is no restaurants in this group"));
            }else{
                var w = (len * 220/*item width*/) + 95/* padding */;
                var $node = this._renderShops(shops).addClass("flipsnap").width(w + "px");
                this.$el.append($node);
                flipsnap('.flipsnap', {distance: 230});
            }
        },

        _renderShops: function(shops){
            var $div = $("<div></div>");
            _.each(shops, function(shop){
                var shopView = new ShopView({model: shop});
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
