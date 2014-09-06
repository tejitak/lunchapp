define(["backbone", "underscore", "jquery", "text!./templates/ShopView.html"], function(Backbone, _, $, tmpl){
    var ShopView = Backbone.View.extend({

        tagName: "div",
        className: "flipsnapItem",
        template: _.template(tmpl),
        defaultImgURL: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjE1MCIgeT0iMTAwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE5cHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MzAweDIwMDwvdGV4dD48L3N2Zz4=",
        // defaultImgURL: lunch.constants.config.CONTEXT_PATH + "/img/logo/logo_200.png",

        // events: {
        //     "click .fnShuffleResultBtn": "onShuffleResultClick"
        // },

        initialize: function() {
        },

        /**
        *@param {enableVote} A boolean value indicating if the vote button should be clickable or not
        *@param {isVoted} A boolean value indicating whether this view should display an undo vote button
        */
        render: function(enableVote, isVoted) {
            var json = this.model.toJSON();
            // show default image when the image URL is not specified
            if(!json.imageURL){
                json.imageURL = this.defaultImgURL;
            }
            this.$el.html(this.template({item: json, labels: lunch.constants.labels, contextPath: lunch.constants.config.CONTEXT_PATH}));

            if(!enableVote){
                this.$(".fnBtnVote").addClass('disabled'); 
                this.$(".fnBtnVote").prop('disabled', true); 
            }
            if(isVoted){
                this.$(".fnBtnVote").addClass('hidden');
                this.$(".fnBtnUndoVote").removeClass('hidden');
                this.$('.fnBtnUndoVote').insertBefore(this.$('.fnBtnVote'));
            }
            this.$(".fnBtnVote").click($.proxy(function(){ this.onVoteClick(this.model); }, this));
            this.$(".fnBtnUndoVote").click($.proxy(function(){ this.onUndoVoteClick(this.model); }, this));
            this.$(".fnBtnInfo").click($.proxy(this.model.showInfo, this.model))
            this.$(".fnBtnShopnameExpand").click($.proxy(function(){
                var titleNode = this.$(".shopViewItem h4");
                titleNode.hasClass('overflow') ? titleNode.removeClass('overflow') : titleNode.addClass('overflow');
            }, this));
            this.$(".fnShuffleResultBtn").click($.proxy(this.onShuffleResultClick, this));
            return this;
        },

        // for override
        onVoteClick: function(shopModel){
        },
        onUndoVoteClick: function(shopModel){
        },
        onShuffleResultClick: function(){
        }
    });
    return ShopView;
});