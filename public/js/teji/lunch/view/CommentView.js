define(["backbone", "underscore", "jquery"], function(Backbone, _, $){
    var CommentView = Backbone.View.extend({

        shop: null,

        events: {
            "click .shopCommentBtn": "addComment"
        },

        initialize: function(options) {
            this.listenTo(this.collection, "addCollection", this.addItems);
            this.options = options;
        },

        addItems: function(groupModels) {
            console.log("CommentView.addItems: start");
            console.log("shopListView: " + this.options.shopListView);

            var targetGroup = this.options.shopListView.getSelectedGroup();
            var shopModels = targetGroup.get("shops");
            for(var i=0, len=shopModels.length; i<len; i++) {
                console.log("shopModel: " + shopModels[i].get("name"));
                this.listenTo(shopModels[i], "selected", this.fillComment);
            }
        },

        fillComment: function(shopModel){
            console.log("CommentView.fillComment: start");
            this.shop = shopModel;
            console.log('shopName: ' + this.shop.get("name"));

            if (this.shop.en_gid) {
                // TODO get note content and set to text area
                $.ajax({
                    type: "GET",
                    url: lunch.constants.config.CONTEXT_PATH + "/evernote/shopComment?gid=" + this.shop.get("en_gid")
                }).done($.proxy(function(json){
                    // create a new shop model from response
                    if(!json.response || !json.response.rest){
                        return;
                    }
                    $(".shopComment").val(json.content);
                }, this));
            } else {
                //TODO just test
                $(".shopComment").val("Test comment");
            }
        },

        addComment: function() {
            var newComment = $(".shopNewComment").val();
            if (!newComment) {
                return;
            }
            //TODO move to Model
            var currentComment = $(".shopComment").val();
            var sendValue = currentComment + "\n---\n" + newComment + "\n";

            $.ajax({
                type: "POST",
                url: lunch.constants.config.CONTEXT_PATH + "/evernote/shopComment?gid=" + this.shop.get("en_gid") + "&title=" + this.shop.get("name") + "&content=" + sendValue
            }).done($.proxy(function(json){
                // create a new shop model from response
                if(!json.response || !json.response.rest){
                    return;
                }

                if (!this.shop.en_gid) {
                    // set gid of new Evernote note.
                    this.shop.set("en_gid", json.gid);

                    // update comment
                    $(".shopComment").val(sendValue);
                    // empty comment user added.
                    $(".shopNewComment").val('');
                }
            }, this));
        }
    });
    return CommentView;
})