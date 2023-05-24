const { HueBridgeAgent } = require("./modules/PhilipsHue");

const HueBridge = require("./modules/PhilipsHue").HueBridge;


let bridgeAgent = new HueBridgeAgent();

let bridge

bridgeAgent.discover(function(result) {
    bridge = result[0];
    bridge.connectAuthorized("9AsfCrhprKZMhnlGjpNtGb0ZssQIb8RJVNafBwfo", function(result) {
        console.log(result);
    })
});