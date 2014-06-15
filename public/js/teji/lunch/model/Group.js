define(["backbone", "jquery"], function(Backbone, $){
    var Group = Backbone.Model.extend({

        defaults: {
            id: "",
            name: "",
            members: [],
            shops: []
        },

        initialize: function(){
        },

        validate: function(attrs){
        }
    });
    return Group;
});
