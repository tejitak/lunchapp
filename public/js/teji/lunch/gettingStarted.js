requirejs.config({
    baseUrl: "/js",
    paths: {
        "jquery": "lib/jquery/jquery",
        "text": "lib/requirejs-text/text",
        "bootstrap": "lib/bootstrap/bootstrap",
        "backbone": "lib/backbone/backbone",
        "underscore": "lib/underscore/underscore"
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        },
        "backbone": {
            deps: ["underscore"]
        }
    }
});

require([
    "jquery",
    "bootstrap",
    "teji/lunch/fbInit"], function($, bootstrap, fbInit) {
        fbInit.load();
        // prevent keep opening dropdown after page load
        $('.dropdown-menu').dropdown('toggle');
});