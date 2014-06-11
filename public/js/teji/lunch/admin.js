requirejs.config({
    baseUrl: "/js",
    paths: {
        "jquery": "lib/jquery/jquery",
        "text": "lib/requirejs-text/text",
        "bootstrap": "lib/bootstrap/bootstrap"
    },
    shim: {
       "bootstrap": {
          deps: ["jquery"]
        }
    }
});

require(["jquery", "bootstrap"], function($, bootstrap) {
    // initial login check
    window.fbCheckLoginState();
    // prevent keep opening dropdown after page load
    $('.dropdown-menu').dropdown('toggle');
});