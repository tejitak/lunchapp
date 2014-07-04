define(["jquery", "backbone", "teji/lunch/model/Group"], function($, Backbone, Group){
    var groupCollection = Backbone.Collection.extend({

        model: Group,

        initialize: function() {
        },

        loadList: function(){
            $.ajax({type: "GET",　
                url: lunch.constants.config.CONTEXT_PATH + "/api/groups?inputToken=" + fbInit.accessToken
            }).done($.proxy(function(data){
                var models = [];
                _.each(data, function(item){
                    models.push(new Group(item));
                });
                // trigger
                this.trigger("addCollection", models);
            }, this));
        },

        postGroup: function(model, callback){
            $.ajax({type: "POST",
                url: lunch.constants.config.CONTEXT_PATH + "/api/group",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({inputToken: fbInit.accessToken, group: model.toJSON()})
            }).done($.proxy(function(response){
                if(callback){
                    callback();
                }
            }, this));
        },

        updateGroup: function(model, callback){
            $.ajax({type: "PUT",
                url: lunch.constants.config.CONTEXT_PATH + "/api/group",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({inputToken: fbInit.accessToken, group: model.toJSON()})
            }).done($.proxy(function(response){
                if(callback){
                    callback();
                }
            }, this));

        }
    });
    return groupCollection;
});
