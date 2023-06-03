const { HueBridgeAgent, HueBridge } = require("./modules/PhilipsHue");

let bridgeAgent = new HueBridgeAgent();

let bridge

console.log("Searching for Hue Bridges...")

bridgeAgent.discoverHueBridges()
.then((bridges) => {
    bridge = bridges[0];
    console.log("Found Hue Bridge: " + bridge.ip )
    console.log("Connecting to ", bridge.ip)
    bridge.connectAuthorized("").then(() => {
        console.log("Connected to Hue Bridge: " + bridge.ip)
    }).catch((err) => {
        console.log(err);
    })
})
.catch((err) => {
    console.error('Error discovering bridges:', err);
});
