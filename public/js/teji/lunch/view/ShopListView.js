define(["backbone", "underscore", "jquery.cookie", "teji/lunch/view/ShopView", "flipsnap", "moment", "moment.timzone", "teji/lunch/util"], function(Backbone, _, cookie, ShopView, flipsnap, moment, momentTz, util){
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
                var shops = model.get("shops");
                var decidedShop = $.grep(shops, function(shop){
                    return shop.id === decidedShopId;
                })[0];
                if(decidedShop){
                    var shopView = new ShopView({model: decidedShop});
                    this.$el.append(shopView.render().$el);
                }else if(shops.length > 0){
                    this.$el.append($('<div class="alert alert-info"></div>').html(lunch.constants.labels.main_warning_no_decidedShop));
                }else{
                    this.$el.append($('<div class="alert alert-info"></div>').html(lunch.constants.labels.main_warning_no_shops));
                }
                // add class for result view
                $(".fnMainContent").addClass("resultView");
            }else{
                this.$el.append($('<div class="alert alert-danger"></div>').html(lunch.constants.labels.main_error_vote_result));
                $(".fnMainContent").removeClass("resultView");
            }
            // check status for evernote reminder
            var evernoteList = model.get("evernote");
            var reminderEntry = null;
            if(evernoteList && evernoteList.length > 0){
                reminderEntry = $.grep(evernoteList, function(obj){
                    return obj.userId == fbInit.me.id;
                })[0];
            }
            if(reminderEntry){
                // show stop reminder button
                $(".fnEvernoteReminderStopBtn").show();
                $(".fnEvernoteReminderSetupBtn").hide();
            }else{
                $(".fnEvernoteReminderStopBtn").hide();
                $(".fnEvernoteReminderSetupBtn").show();                
            }
            // check status for evernote lunch log
            if(model.get("state") === "voted"){
                $(".fnEvernoteLogContainer").show();
            }else{
                $(".fnEvernoteLogContainer").hide();                
            }
        },

        _renderShops: function(shops){
            var len = shops.length;
            if(len == 0){
                this.$el.append($('<div class="alert alert-info"></div>').html(lunch.constants.labels.main_warning_no_shops));
            }else{
                var $node = this._createShopsNode(shops);
                if(util.isMobileScreen()){
                    var w = (len * 220/*item width*/) + 95/* padding */;
                    $node.addClass("flipsnap").width(w + "px");
                    this.$el.append($node);
                    // activate filesnap 220px seems to be the perfect distance for some reason. Maybe because .flipsnapItem has 200px and 10px padding (220px)
                    flipsnap('.fnResultViewList .flipsnap', {distance: 220});
                }else{
                    $node.addClass("flexContainer");
                    this.$el.append($node);
                }
            }
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
            if(!fbInit.me.id){ return; }
            // check login state
            $.ajax({type: "GET",
                url: lunch.constants.config.CONTEXT_PATH + "/evernote/user?userId=" + fbInit.me.id,
                cache: false
            }).done($.proxy(function(response){
                if(response && response.username){
                    // show user info and logout button
                    $(".fnEvernoteLoginUser").html(response.username);
                    $(".fnEvernoteMain").show();
                }else{
                    // show login button
                    $(".fnEvernoteLogin").show();
                }
            }, this));
            // authentication
            $(".fnEvernoteAuthBtn").click(function(){
                location.href= location.href + "api/evernote/authenticate?callback=" + location.href + "evernote/?userId=" + fbInit.me.id;
            });
            // reminder
            var sendReminder = function(enableReminder, groupId){
                $.ajax({type: "POST",
                    url: lunch.constants.config.CONTEXT_PATH + "/evernote/reminder",
                    contentType: "application/json; charset=utf-8",
                    processData: false,
                    data: JSON.stringify({
                        lunchTimerURL: location.href,
                        inputToken: fbInit.accessToken,
                        userId: fbInit.me.id,
                        groupId: groupId,
                        votingTimeReminder: enableReminder
                    })
                }).done($.proxy(function(response){
                    location.href = lunch.constants.config.CONTEXT_PATH + "/";
                }, this));
            };

            $(".fnEvernoteReminderSetupBtn").click($.proxy(function(){
                sendReminder(true, this.getSelectedGroup().get("_id"));
            }, this));

            $(".fnEvernoteReminderStopBtn").click($.proxy(function(){
                sendReminder(false, this.getSelectedGroup().get("_id"));
            }, this));

            // lunch log
            $(".fnEvernoteLogBtn").click($.proxy(function(){
                var group = this.getSelectedGroup();
                var decidedShopId = group.get("decidedShop");
                var decidedShop = $.grep(group.get("shops"), function(shop){
                    return shop.id === decidedShopId;
                })[0];
                if(!decidedShop){
                    return;
                }

                var shopName = decidedShop.get("name");
                var shopImageURL = decidedShop.get("imageURL");
                var lunchDate = "";

                $.ajax({type: "POST",
                    url: lunch.constants.config.CONTEXT_PATH + "/evernote/log",
                    contentTYpe: "application/json; charset=utf-8",
                    processDate: false,
                    data: {
                        title: shopName,
                        imageURL: shopImageURL
                    }
                }).done(function(){
                    alert(lunch.constants.labels.evernote_log_success);
                });
            }, this));
        }
    });
    return ShopListView;
});
