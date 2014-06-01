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
    console.log("loaded");
});