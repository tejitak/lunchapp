/**
 * Filters
 */
var Vue = require("vue");

Vue.filter('fbUserImageFilter', function (id) {
    return "http://graph.facebook.com/" + id + "/picture?type=square";
});