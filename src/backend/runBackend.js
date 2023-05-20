"use strict";
exports.__esModule = true;
var PhilipsHue_1 = require("./modules/PhilipsHue");
var bridge = new PhilipsHue_1.HueBridge();
bridge.discoverBridge();
