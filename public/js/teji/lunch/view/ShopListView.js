define(["backbone", "underscore", "jquery.cookie", "teji/lunch/view/ShopView", "flipsnap", "moment", "moment.timzone"], function(Backbone, _, cookie, ShopView, flipsnap, moment, momentTz){
    var ShopListView = Backbone.View.extend({

        COOKIE_SELECTED_GROUP: "teji.lunch.selectedGroup",
        _groups: null,

        initialize: function() {
            this.listenTo(this.collection, "addCollection", this.addItems);
            this.$groupSelect = $(".fnGroupSelect");
            this._setupEvernote();
        },

        addItems: function(models){
            models = this._groups = models || [];
            // clearShops node
            this.clearShops();
            if(models.length == 0){
                $(".fnResultViewFilterSection").hide();
                // show no groups messages
                this.$el.append($('<div class="alert alert-info"></div>').html(lunch.constants.labels.main_warning_no_groups));
                this.$el.append($('<button type="button" class="btn btn-primary"></button>').html(lunch.constants.labels.main_no_group_loginBtn).click(function(){
                    location.href = lunch.constants.config.CONTEXT_PATH + "/admin";
                }));
           }else{
                $(".fnResultViewFilterSection").show();
                // read id from cookie
                var initialSelectedGroupId = $.cookie(this.COOKIE_SELECTED_GROUP);
                for(var i=0, len=models.length; i<len; i++){
                    var groupId = models[i].get("_id");
                    var $option = $("<option></option>").val(groupId).html(models[i].get("name"));
                    if(groupId === initialSelectedGroupId){
                        $option.attr("selected", "selected");
                    }
                    $option.appendTo(this.$groupSelect);
                }
                this.$groupSelect.change($.proxy(function(){
                    this.clearShops();
                    var selectedGroup = this.getSelectedGroup();
                    this._renderGroup(selectedGroup);
                    // set id to cookie
                    $.cookie(this.COOKIE_SELECTED_GROUP, selectedGroup.get("_id"), {expires: 7});
                }, this));
                this._renderGroup(this.getSelectedGroupById(initialSelectedGroupId) || models[0]);
                if(models.length > 1){
                    $(".fnGroupSelectContainer").show();
                }else{
                    $(".fnGroupSelectContainer").hide();
                }
            }
        },

        showTimer: function(lunchTime, timezone){
            var countdownMinutes = 10;
            // TODO: format timezone 
            var lunchTime = moment.tz(lunchTime, "HH:mm", timezone);
            var diffMinutes = lunchTime.diff(moment()) / (1000 * 60);
            diffMinutes = (diffMinutes + 24*60) % (24*60); // Makes sure diffMinutes isn't negative by adding another day (24*60m) and using the modulus operator.
            //console.log("Minutes until lunch: " + diffMinutes);

            if(diffMinutes < countdownMinutes){
                setInterval(function () {
                    diffMinutes = lunchTime.diff(moment()) / (1000 * 60);
                    diffMinutes = (diffMinutes + 24*60) % (24*60);
                    diffSeconds = diffMinutes * 60;
                    if(!(diffMinutes < countdownMinutes) || Math.floor(diffMinutes)===0 && Math.floor(diffSeconds)===0){
                        location.reload();
                    }
                    $(".fnResultViewTitle").html(lunch.constants.labels.main_resultList_voting_countdown + Math.floor(diffMinutes) + ":" + ((diffSeconds%60 < 10) ? "0" : "") + Math.floor(diffSeconds%60));
                }, 1000);
            }
        },

        _renderGroup: function(model){
            if(model.get("state") === "vote"){
                this.showTimer(model.get("lunchTime"), model.get("timezone"));
                this._votedShopId = model.getVotedShopId(fbInit.me.id);
                var shops = model.get("shops");
                this._renderShops(model.get("shops"));
                // show advanced section when categories exist
                var uniqueCategories = model.getUniqueCategories();
                var $categoryFilterSelect = $(".fnCategoryFilter");
                $categoryFilterSelect.empty();
                $("<option></option>").val("all").html(lunch.constants.labels.main_filter_category_all + " (" + shops.length + ")").appendTo($categoryFilterSelect);
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
                var decidedShopId = model.get("decidedShop");
                var decidedShop = $.grep(model.get("shops"), function(shop){
                    return shop.id === decidedShopId;
                })[0];
                if(decidedShop){
                    var shopView = new ShopView({model: decidedShop});
                    this.$el.append(shopView.render().$el);
                }else{
                    this.$el.append($('<div class="alert alert-info"></div>').html(lunch.constants.labels.main_warning_no_shops));
                }
                // add class for result view
                $(".fnMainContent").addClass("resultView");
            }else{
                this.$el.append($('<div class="alert alert-danger"></div>').html(lunch.constants.labels.main_error_vote_result));
                $(".fnMainContent").removeClass("resultView");
            }
            // TODO: check status for evernote setting
            
        },

        _renderShops: function(shops){
            var len = shops.length;
            if(len == 0){
                this.$el.append($('<div class="alert alert-info"></div>').html(lunch.constants.labels.main_warning_no_shops));
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
            // TODO: sort shold be an option?
            // sort by current voting count
            shops.sort(function(obj1, obj2){
                return obj2.get("votedBy").length - obj1.get("votedBy").length;
            });
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
                var enableVote = !this._votedShopId; //enableVote = false if _votedShop is set to some ShopId
                var isVoted = this._votedShopId === shop.get("id");
                var el = shopView.render(enableVote, isVoted).el;
                $div.append(el);
            }, this);
            return $div;
        },

        getSelectedGroup: function(){
            return this.getSelectedGroupById(this.$groupSelect.val());
        },

        getSelectedGroupById: function(id){
            return $.grep(this._groups, $.proxy(function(group){
                return group.get("_id") === id;
            }, this))[0];
        },
        
        clearShops: function(){
            this.$el.empty();
        },

        _setupEvernote: function(){
            $(".fnEvernoteReminderUpdateBtn").click($.proxy(function(){
                var votingTimeReminder = $("#evernote_votingTime_reminder_checkbox").is(':checked');
                $.ajax({type: "POST",
                    url: lunch.constants.config.CONTEXT_PATH + "/evernote/reminder",
                    contentType: "application/json; charset=utf-8",
                    processData: false,
                    data: JSON.stringify({
                        lunchTimerURL: location.href,
                        inputToken: fbInit.accessToken,
                        userId: fbInit.me.id,
                        groupId: this.getSelectedGroup().get("_id"),
                        votingTimeReminder: votingTimeReminder
                    })
                }).done($.proxy(function(response){
                    location.href = lunch.constants.config.CONTEXT_PATH + "/";
                }, this));
            }, this));
        }
    });
    return ShopListView;
});
