/**
 * groups page
 */
var Vue = require("vue");
var api = require("../common/api");

module.exports = Vue.extend({

    template: "#lunch-groups-tmpl",

    data: function(){
        return {
            groups: []
        };
    },

    created: function() {
        this.loadGroups();
    },

    methods: {
        loadGroups: function(argument) {
            var that = this;
            var cb = function(res){
                console.log(res);
                that.groups = res || [];
            };
            api.getGroups({accessToken: this.$root.accessToken}, cb);
        }        
    }
});