define(["backbone", "underscore", "jquery",  "flipsnap", "teji/lunch/util", "text!./templates/PopularShopsView.html"],
function(Backbone, _, $, flipsnap, util, tmpl){
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
                var w = (randomized.length * 220/*item width*/) + 95/* padding */;
                var isMobile = util.isMobileScreen();
                this.$el.html(this.template({
                    items: randomized,
                    labels: lunch.constants.labels,
                    isMobile: isMobile,
                    width: w
                }));
                if(isMobile){
                    flipsnap('.fnPopularList .flipsnap', {distance: 220});
                }
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