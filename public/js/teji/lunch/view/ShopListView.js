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
                $(".fnResultViewFilterSection").hide();
                // show no groups messages
                this.$el.append($('<div class="alert alert-info"></div>').html("No Groups - Please create a new group or join to an existing group."));
                this.$el.append($('<button type="button" class="btn btn-primary"></button>').html("Manage Groups").click(function(){
                    location.href = "/admin";
                }));
           }else{
                $(".fnResultViewFilterSection").show();
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
            if(model.get("state") === "vote"){
                // _votedShopId ? GLOBAL Variable. maybe a better way to solve this?
                // also one problem I experience with fbInit.me.id is that it sometimes loads after the rendering, giving the shopview rendering the wrong parameters.
                _votedShopId = model.getVotedShopId(fbInit.me.id/*"661664063920036"*/); 
                var shops = model.get("shops");
                this._renderShops(model.get("shops"));
                // show advanced section when categories exist
                var uniqueCategories = model.getUniqueCategories();
                var $categoryFilterSelect = $(".fnCategoryFilter");
                $categoryFilterSelect.empty();
                $("<option></option>").val("all").html("All (" + shops.length + ")").appendTo($categoryFilterSelect);
                for(var i=0, len=uniqueCategories.length; i<len; i++){
                    $("<option></option>").val(uniqueCategories[i].name).html(uniqueCategories[i].name + " (" + uniqueCategories[i].count + ")").appendTo($categoryFilterSelect);
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
                $(".fnMainContent").removeClass("resultView");
            }else if(model.get("state") === "voted"){
                //TODO Make nice view for decided shop.
                var decidedShopId = model.get("decidedShop");
                var decidedShop = $.grep(model.get("shops"), function(shop){
                    return shop.id === decidedShopId;
                })[0];
                var shopView = new ShopView({model: decidedShop});
                this.$el.append(shopView.render().$el);
                // add class for result view
                $(".fnMainContent").addClass("resultView");
            }else{
                this.$el.append($('<div class="alert alert-danger"></div>').html("Something went wrong..."));
                $(".fnMainContent").removeClass("resultView");
            }
        },

        _renderShops: function(shops){
            var len = shops.length;
            if(len == 0){
                this.$el.append($('<div class="alert alert-info"></div>').html("There is no restaurants in this group"));
            }else{
                var w = (len * 220/*item width*/) + 95/* padding */;
                var $node = this._createShopsNode(shops).addClass("flipsnap").width(w + "px");
                this.$el.append($node);
                this.enableFilpSnap();
            }
        },

        enableFilpSnap: function(){
            var flip = flipsnap('.flipsnap', {distance: 220});//220px seems to be the perfect distance for some reason. Maybe because .flipsnapItem has 200px and 10px padding (220px)
            // attach event for flipsnap
            var $prevArrow = $("<div></div>").addClass("flipsnapPrevArrow disabled").click(function() {
                if(flip.hasPrev()){ flip.toPrev(); }
            });
            this.$el.append($prevArrow);
            var $nextArrow = $("<div></div>").addClass("flipsnapNextArrow disabled").click(function() {
                if(flip.hasNext()){ flip.toNext(); }
            });
            this.$el.append($nextArrow);
            var updateFlipBtnStates = function(){
                flip.hasPrev() ? $prevArrow.removeClass("disabled") : $prevArrow.addClass("disabled");
                flip.hasNext() ? $nextArrow.removeClass("disabled") : $nextArrow.addClass("disabled");
            };
            flip.element.addEventListener('fspointmove', updateFlipBtnStates, false);
            updateFlipBtnStates();
        },

        _createShopsNode: function(shops){
            var $div = $("<div></div>");
            _.each(shops, function(shop){
                var shopView = new ShopView({model: shop});
                shopView.onVoteClick = $.proxy(function(shopModel){
                    var groupModel = this.getSelectedGroup();
                    if(groupModel){
                        // TODO: set callback (made it reload, maybe a better solution exists?)
                        var callback = function(){ location.reload(); };
                        groupModel.vote(shopModel.get("id"), callback);
                    }
                }, this);

                shopView.onUndoVoteClick = $.proxy(function(shopModel){
                    var groupModel = this.getSelectedGroup();
                    if(groupModel){
                        // TODO: set callback (made it reload, maybe a better solution exists?)
                        var callback = function(){ location.reload(); };
                        groupModel.undoVote(shopModel.get("id"), callback);
                    }
                }, this);

                var enableVote = !_votedShopId; //enableVote = false if _votedShop is set to some ShopId
                var isVoted = _votedShopId === shop.get("id");
                var el = shopView.render(enableVote, isVoted).el;
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
