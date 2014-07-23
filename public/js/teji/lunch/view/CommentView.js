define(["backbone", "underscore", "jquery", "teji/lunch/util"], function(Backbone, _, $, util){
    var CommentView = Backbone.View.extend({

        SEPARATOR: "---",

        shop: null,

        _currentText: "",

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
            console.log("shopName: " + this.shop.get("name"));
            console.log("en_gid: " + this.shop.get("en_gid"));

            $(".shopName").text(this.shop.get("name"));

            if (this.shop.get("en_gid")) {
                // get note content and set to text area
                $.ajax({
                    type: "GET",
                    url: lunch.constants.config.CONTEXT_PATH + "/evernote/shopComment?gid=" + this.shop.get("en_gid")
                }).done($.proxy(function(json){
                    var $commentDisplayNode = $(".shopComment");
                    this._currentText = "";
                    $commentDisplayNode.html("");
                    if(!json || !json.content) {
                        // clear en_gid (it is assumed to be error e.g. remove note in evernote)
                        this.shop.set("en_gid", "");
                        return;
                    }
                    console.log("CommentView.fillComment: enContent=" + json.content);
                    // parse xml and show content.
                    var enNote = $.parseXML(json.content);
                    var $note = $(enNote).find("en-note");
                    if($note && $note.size() > 0){
                        var text = this._currentText = $note.html();
                        $commentDisplayNode.html(this._textToHTML(text));
                    }
                }, this));
            }

            //show comment
            $(".shopName").show();
            $(".shopComment").show();
            $(".shopNewComment").show();
            $(".shopCommentBtn").show();

        },

        addComment: function() {
            console.log("CommentView.addComment: start");
            var newComment = $(".shopNewComment").val();
            if (!newComment) {
                return;
            }
            $.ajax({
                type: "POST",
                url: lunch.constants.config.CONTEXT_PATH + "/evernote/shopComment?gid=" + this.shop.get("en_gid"),
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({
                    title: this.shop.get("name"),
                    content: this._currentText + this.SEPARATOR + newComment
                })
            }).done($.proxy(function(data) {
                if(!data) {
                    return;
                }
                console.log("CommentView.addComment: data.guid=" + data.guid);

                if (!this.shop.get("en_gid")) {
                    this.shop.set("en_gid", data.guid);
                    // update the shop model (whole group model)to DB.
                    var targetGroup = this.options.shopListView.getSelectedGroup();
                    this.collection.updateGroup(targetGroup, function(){});
                }
                // update comment
                $(".shopComment").html(this._textToHTML(this._currentText + this.SEPARATOR + newComment));
                // empty comment user added.
                $(".shopNewComment").val('');
            }, this));
        },

        _textToHTML: function(text){
            // escape html content for XSS
            text = util.escapeHTML(text);
            // split with separator
            return text.split(this.SEPARATOR).join("<hr/>");
        }
    });
    return CommentView;
})