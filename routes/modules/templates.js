var fs = require('fs');
var _ = require('underscore');
var resourceBundle = require('./resourceBundle');
var local_settings = require('../../local_settings').settings;

// load templates
var _templates = {};
fs.readFile('./views/_templates/header.html', 'UTF-8', function (err, data) {
    if (err){ throw err; }
    _templates.header = data;
});

fs.readFile('./views/_templates/footer.html', 'UTF-8', function (err, data) {
    if (err){ throw err; }
    _templates.footer = data;
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
