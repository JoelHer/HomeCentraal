const fs = require('fs');
const pe = require(`./plugins/PhilipsHue/main.js`);
pe.enable()

function enablePlugins(){
    const plugins = fs.readdirSync('src/backend/plugins');
    for (let plugin in plugins){
        const p = require(`./plugins/${plugin}/main.js`);
        p.enable(); 
    };
}
