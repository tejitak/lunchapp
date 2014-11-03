/**
 * Filters
 */
(function(global) {

    Vue.filter('fbUserImageFilter', function (id) {
        return "http://graph.facebook.com/" + id + "/picture?type=square";
    });

})(window);