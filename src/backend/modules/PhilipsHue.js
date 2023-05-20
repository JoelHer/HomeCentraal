const axios = require('axios');
const { json } = require('stream/consumers');

class HueBridge{
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

    //Function to set the ip of the bridge
    setIp(ip){
        this.ip = ip;
    }

    discoverBridge(callback = function() {}) {
        axios.get('https://discovery.meethue.com/')
        .then(response => {
            //console.log("res", response.data);
            const r = response.data;
            if (r.length > 0) {
                //console.log("ip: ", r[0].internalipaddress);
                this.ip = r[0].internalipaddress;
                callback(this.ip);
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


module.exports = { HueBridge }