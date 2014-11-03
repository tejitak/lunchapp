var fs = require('fs');
var _ = require('underscore');
var resourceBundle = require('./resourceBundle');
var local_settings = require('../../local_settings').settings;

// load templates
var TMPL_MAP = {
    "header": "header.html",
    "footer": "footer.html",
    "script": "script.html",
    "templates": "templates.html"
};
var _templates = {};

_.each(TMPL_MAP, function(value, key, list){
    fs.readFile('./views/_templates/' + value, 'UTF-8', function (err, data) {
        if (err){ throw err; }
        _templates[key] = data;
    });        
});

module.exports = function(req){
    var compiled = {};
    var data = {
        "config": local_settings,
        "labels": resourceBundle.getLabels(req)
    };
    // console.log(JSON.stringify(data));
    for(var name in _templates){
        if(name && _templates[name]){
            compiled[name] = _.template(_templates[name])(data);
        }
    }
    return compiled;
};
