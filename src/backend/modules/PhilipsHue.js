const axios = require('axios');
const { json } = require('stream/consumers');
const https = require('https');

const agent = new https.Agent({  
    rejectUnauthorized: false
});

class HueBridgeAgent{
    id = "";
    ip = "";
    port = 443;
    username = undefined;
    token = undefined;

    constructor(){
        this.id = "";
        this.ip = "";
        this.port = 443;
        this.username = undefined;
        this.token = undefined;
    }

    discover(callback = function() {}) {
        axios.get('https://discovery.meethue.com/', { httpsAgent: agent })
        .then(response => {
            //console.log("res", response.data);
            const r = response.data;
            if (r.length > 0) {
                //console.log("ip: ", r[0].internalipaddress);
                //this.ip = r[0].internalipaddress;
                callback(r);
            } else {
                callback(undefined);
            }
        })
        .catch(error => {
            // handle error
            throw error;
        });
    }
}

class HueBridge{
    id = "";
    ip = "";
    port = 443;
    username = undefined;
    token = undefined;
}

module.exports = { HueBridgeAgent }