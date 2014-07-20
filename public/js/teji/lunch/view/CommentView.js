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

            //enable input section
            $(".shopComment").removeAttr("disabled");
            $(".shopNewComment").removeAttr("disabled");
            $(".shopCommentBtn").removeAttr("disabled");

            this.shop = shopModel;
            console.log("shopName: " + this.shop.get("name"));
            console.log("en_gid: " + this.shop.get("en_gid"));

            if (this.shop.get("en_gid")) {
                // get note content and set to text area
                $.ajax({
                    type: "GET",
                    url: lunch.constants.config.CONTEXT_PATH + "/evernote/shopComment?gid=" + this.shop.get("en_gid")
                }).done($.proxy(function(json){
                    if(!json || !json.content) {
                        return;
                    }

                    console.log("CommentView.fillComment: enContent=" + json.content);

                    // parse xml and show content.
                    var shopComment = "";
                    var enNote = $.parseXML(json.content);
                    var divs = $(enNote).find("en-note div");
                    divs.each(function () {
                        console.log("div.text()" + $(this).text());
                        shopComment += $(this).text() + "\n";
                    });

                    $(".shopComment").val(shopComment);
                }, this));
            }
        },

        addComment: function() {
            console.log("CommentView.addComment: start");
            var newComment = $(".shopNewComment").val();
            if (!newComment) {
                return;
            }
            var currentComment = $(".shopComment").val();
            var currentCommentLines = currentComment.split("\n");
            var sendValue = "";
            for (var i=0, len=currentCommentLines.length; i<len; i++) {
                sendValue += ("<div>" + currentCommentLines[i] + "</div>");
            }
            sendValue += "<div>---</div><div>" + newComment + "</div>";

            $.ajax({
                type: "POST",
                url: lunch.constants.config.CONTEXT_PATH + "/evernote/shopComment?gid=" + this.shop.get("en_gid") + "&title=" + this.shop.get("name") + "&content=" + sendValue
            }).done($.proxy(function(data) {
                if(!data) {
                    return;
                }
                console.log("CommentView.addComment: data.guid=" + data.guid);

                if (!this.shop.get("en_gid")) {
                    this.shop.set("en_gid", data.guid);
                    //TODO save shop model to DB.
                }

                // update comment
                $(".shopComment").val(currentComment + "---\n" + newComment + "\n");
                // empty comment user added.
                $(".shopNewComment").val('');
            }, this));
        }
    });
    return CommentView;
})