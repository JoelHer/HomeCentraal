const { HueBridgeAgent } = require("./modules/PhilipsHue");

const HueBridge = require("./modules/PhilipsHue").HueBridge;


let bridgeAgent = new HueBridgeAgent();

let bridge

bridgeAgent.discover(function(result) {
    bridge = result[0];
    bridge.connectAuthorized("9AsfCrhprKZMhnlGjpNtGb0ZssQIb8RJVNafBwfo", function(res) {
        if (res) {
            console.log(`Successfully connected to bridge ${bridge.ip}`);
            console.log(res.error);
        } else {
            console.log(`Failed to connect to bridge ${bridge.ip}`);
            console.log();
        }
    })

    bridge.eventEmitter.on("error", function(error) {
        console.log(error);
        console.log("Error occured");
    })
});