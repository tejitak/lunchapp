define(["backbone", "underscore", "jquery"], function(Backbone, _, $){
    var CommentView = Backbone.View.extend({
        el: $(".commentContainer"),

        events: {
            "click .shopCommentBtn": "addComment"
        },

        initialize: function() {
        },

        fillComment: function(shopModel){
            //TODO how to get shop info?
            this.shop = shopModel;

            if (this.shop.en_gid) {
                //TODO move to Model
                // get note content and set to text area
                $.ajax({
                    type: "GET",
                    url: lunch.constants.config.CONTEXT_PATH + "/evernote/shopComment?gid=" + this.shop.en_gid
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

            if (!this.shop.en_gid) {
                // create a note and set gid
                $.ajax({
                    type: "POST",
                    url: lunch.constants.config.CONTEXT_PATH + "/evernote/shopComment?gid=" + this.shop.en_gid + "&title=" + this.shop.name + "&content=" + sendValue
                }).done($.proxy(function(json){
                    // create a new shop model from response
                    if(!json.response || !json.response.rest){
                        return;
                    }

                    // set gid of new Evernote note.
                    this.shop.en_gid = json.gid;

                    // update comment
                    $(".shopComment").val(sendValue);
                    // empty comment user added.
                    $(".shopNewComment").val('');
                }, this));
            }
        }
    });
    return CommentView;
})