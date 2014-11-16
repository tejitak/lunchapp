/**
 * Vote page
 */
var Vue = require("vue");
var api = require("../common/api");

module.exports = Vue.extend({

    template: "#lunch-voting-tmpl",

    data: function(){
        return {
            groups: [],
            selectedGroup: {}
        };
    },

    created: function() {
        this.loadGroups();
    },

    methods: {
        loadGroups: function(){
            var that = this;
            var cb = function(res){
                console.log(res);
                that.groups = res = res || [];
                // TODO: temp to be replaced by group selection
                if(res.length > 0){
                    that.selectedGroup = res[0];
                }
            };
            api.getGroups({accessToken: this.$root.accessToken}, cb);
        },

        vote: function(shopId){
            var that = this;
            var cb = function(res){
                console.log(res);
            };
            api.vote({
                accessToken: this.$root.accessToken,
                groupId: this.selectedGroup._id,
                shopId: shopId
            }, cb);
        },

        unvote: function(shopId){
            var that = this;
            var cb = function(res){
                console.log(res);
            };
            api.unvote({
                accessToken: this.$root.accessToken,
                groupId: this.selectedGroup._id,
                shopId: shopId
            }, cb);
        },

        shuffuleResult: function(){
            var that = this;
            var cb = function(res){
                console.log(res);
            };
            api.shuffleResult({
                accessToken: this.$root.accessToken,
                groupId: this.selectedGroup._id
            }, cb);
        }
    }
});