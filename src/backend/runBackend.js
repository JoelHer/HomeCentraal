const { HueBridgeAgent } = require("./modules/PhilipsHue");

const HueBridge = require("./modules/PhilipsHue").HueBridge;


let bridgeAgent = new HueBridgeAgent();

bridgeAgent.discoverBridge(function(result) {
  
});