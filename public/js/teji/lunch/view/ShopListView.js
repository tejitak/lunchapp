define(["backbone", "underscore", "teji/lunch/view/ShopView", "flipsnap"], function(Backbone, _, ShopView, flipsnap){
    var ShopListView = Backbone.View.extend({

        _groups: null,

        initialize: function() {
            this.listenTo(this.collection, "addCollection", this.addItems);
            this.$groupSelect = $(".fnGroupSelect");
        },

        addItems: function(models){
            models = this._groups = models || [];
            // clearShops node
            this.clearShops();
            if(models.length == 0){
                $(".fnResultViewFilterection").hide();
                // show no groups messages
                this.$el.append($('<div class="alert alert-info"></div>').html("No Groups - Please create a new group or join to an existing group."));
            }else{
                $(".fnResultViewFilterection").show();
                // TODO: switch UI between result and vote
                this._renderGroup(models[0]);
                // show group selector
                for(var i=0, len=models.length; i<len; i++){
                    $("<option></option>").val(i).html(models[i].get("name")).appendTo(this.$groupSelect);
                }
                this.$groupSelect.change($.proxy(function(){
                    this.clearShops();
                    this._renderGroup(this.getSelectedGroup());
                }, this));
                if(models.length > 1){
                    $(".fnGroupSelectContainer").show();
                }else{
                    $(".fnGroupSelectContainer").hide();
                }
            }
        },

        _renderGroup: function(model){
            var shops = model.get("shops")
            this._renderShops(shops);
            // show advanced section when categories exist
            var categories = $.map(shops, function(shop){ return shop.get("category"); });
            var uniqueCategories = [];
            var countMap = {};
            $.each(categories, function(i, cat){
                if(!countMap[cat]){
                    countMap[cat] = 1;
                    uniqueCategories.push(cat);
                }else{
                    countMap[cat]++;
                }
            });
            var $categoryFilterSelect = $(".fnCategoryFilter");
            $categoryFilterSelect.empty();
            $("<option></option>").val("all").html("All (" + categories.length + ")").appendTo($categoryFilterSelect);
            for(var i=0, len=uniqueCategories.length; i<len; i++){
                $("<option></option>").val(uniqueCategories[i]).html(uniqueCategories[i] + " (" + countMap[uniqueCategories[i]] + ")").appendTo($categoryFilterSelect);
            }
            $categoryFilterSelect.change($.proxy(function(){
                // refresh UI with specified category
                this.clearShops();
                var group = this.getSelectedGroup();
                var selectedCategory = $(".fnCategoryFilter").val();
                var filteredShops = (selectedCategory == "all") ? group.get("shops") : $.grep(group.get("shops"), function(shop){
                    return shop.get("category") == selectedCategory;
                });
                this._renderShops(filteredShops);
            }, this));
        },

        _renderShops: function(shops){
            var len = shops.length;
            if(len == 0){
                this.$el.append($('<div class="alert alert-info"></div>').html("There is no restaurants in this group"));
            }else{
                var w = (len * 220/*item width*/) + 95/* padding */;
                var $node = this._createShopsNode(shops).addClass("flipsnap").width(w + "px");
                this.$el.append($node);
                flipsnap('.flipsnap', {distance: 230});
            }
        },

        _createShopsNode: function(shops){
            var $div = $("<div></div>");
            _.each(shops, function(shop){
                var shopView = new ShopView({model: shop});
                shopView.onVoteClick = $.proxy(function(shopModel){
                    var groupModel = this.getSelectedGroup();
                    if(groupModel){
                        // TODO: set callback
                        var callback = function(){};
                        groupModel.vote(shopModel.get("id"), callback);
                    }
                }, this);
                var el = shopView.render().el;
                $div.append(el);
            }, this);
            return $div;
        },

        getSelectedGroup: function(){
            return this._groups[this.$groupSelect.val()];
        },
        
        clearShops: function(){
            this.$el.empty();
        }
    });
    return ShopListView;
});
