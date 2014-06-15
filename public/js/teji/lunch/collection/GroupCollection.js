define(["jquery", "backbone", "teji/lunch/model/Group"], function($, Backbone, Group){
    var groupCollection = Backbone.Collection.extend({

        model: Group,

        initialize: function() {
        },

        loadList: function(){
            $.ajax({type: "GET",　
                url: "/api/groups?inputToken=" + fbInit.accessToken
            }).done($.proxy(function(response){
                // TODO: temp for demo data, it should be XHR for /api/groups
                // with response.authResponse.accessToken
                var data = [
                    {name: "Group1", members: [{id: "123", name: "Takuya Tejima"}, {id: "456", name: "Ryo Ashi"}], shops: []},
                    {name: "Lunchメンバー＠LINE", members: [{id: "123", name: "Takuya Tejima"}, {id: "456", name: "Ryo Ashi"}], shops: []}
                ];
                var models = [];
                _.each(data, function(item){
                    models.push(new Group(item));
                });
                // trigger
                this.trigger("addCollection", models);
            }, this));
        },

        postGroup: function(model, callback){
            // TODO: change to "/api/group" 
            $.ajax({type: "POST",
                url: "/admin/group",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify(model.toJSON())
            }).done($.proxy(function(response){
                // TODO: 
                console.log(response);
                if(callback){
                    callback();
                }
            }, this));
        },

        putGroup: function(){

        }
    });
    return groupCollection;
});
