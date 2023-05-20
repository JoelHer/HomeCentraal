import { HueBridge } from "./modules/PhilipsHue";


let bridge = new HueBridge();

bridge.discoverBridge();