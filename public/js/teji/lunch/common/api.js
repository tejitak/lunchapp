(function() {
    "use strict";
    var $ = require("jquery");

    module.exports = {

        getGroups: function(params, cb){
            $.ajax({type: "GET",　
                url: lunch.constants.config.CONTEXT_PATH + "/api/groups?inputToken=" + params.accessToken
            }).done(function(res){
                if(cb){ cb(res); }
            });
        },

        vote: function(params, cb){
            $.ajax({type: "POST",
                url: lunch.constants.config.CONTEXT_PATH + "/api/vote",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({inputToken: params.accessToken, groupId: params.groupId, shopId: params.shopId})
            }).done(function(res){
                if(cb){
                    cb(res);
                }
            });
        },

        unvote: function(params, cb){
            $.ajax({type: "DELETE",
                url: lunch.constants.config.CONTEXT_PATH + "/api/vote",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({inputToken: params.accessToken, groupId: params.groupId, shopId: params.shopId})
            }).done(function(res){
                if(cb){
                    cb(res);
                }
            });
        },

        shuffleResult: function(params, cb){
            $.ajax({type: "POST",
                url: lunch.constants.config.CONTEXT_PATH + "/api/shuffleResult",
                contentType: "application/json; charset=utf-8",
                processData: false,
                data: JSON.stringify({groupId: params.groupId, inputToken: params.accessToken})
            }).done(function(res){
                if(cb){
                    cb(res);
                }
            });
        }

    };
})();