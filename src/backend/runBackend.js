var fs = require('fs');
var pe = require("./plugins/PhilipsHue/main.js");
pe.enable();
function enablePlugins() {
    var plugins = fs.readdirSync('src/backend/plugins');
    for (var plugin in plugins) {
        var p = require("./plugins/".concat(plugin, "/main.js"));
        p.enable();
    }
    ;
}
