const { HueBridgeAgent, HueBridge } = require("./modules/PhilipsHue");

//const HueBridge = require("./modules/PhilipsHue").HueBridge;


let bridgeAgent = new HueBridgeAgent();

let bridge

bridgeAgent.discoverHueBridges()
.then((bridges) => {
    console.log('Discovered bridges:', bridges);
})
.catch((err) => {
    console.error('Error discovering bridges:', err);
});
