define(["backbone", "underscore", "jquery", "text!./templates/PopularShopsView.html"], function(Backbone, _, $, tmpl){
    var PopularShopsView = Backbone.View.extend({
        tagName: "div",
        template: _.template(tmpl),

        initialize: function() {
        },
        render: function(){
            $.ajax({
                type: "GET",
                url: lunch.constants.config.CONTEXT_PATH + "/api/shop/ranking"
            }).done($.proxy(function(data){
                var randomized = this._randomize(data, 3);
                this.$el.html(this.template({items: randomized, labels: lunch.constants.labels}));
                // add class for result view
                $(".fnPopularList").addClass("flexContainer");
            }, this));
            return this;
        },
        _randomize: function(data, count){
            var l = data.length;
            var randomized = [];
            for(var i = l - 1; i > l - count - 1; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = data[i];
                randomized.push(data[j]);
                data[j] = tmp;
            }
            return randomized;
        }

    });
    return PopularShopsView;
});