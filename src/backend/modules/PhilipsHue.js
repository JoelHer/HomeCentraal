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
            const r = response.data;
            if (r.length > 0) {
                let rt = [];
                for (let i in r) {
                    rt.push(new HueBridge(r[i].id, r[i].internalipaddress, 443, undefined, undefined));
                }
                callback(rt);
            } else {
                callback(undefined);
            }
        })
        .catch(error => {
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
    authorized = false;
    pollingInterval = 500;

    constructor(id, ip, port, username, token){
        this.id = id;
        this.ip = ip;
        this.port = port;
        this.username = username;
        this.token = token;
    }

    connectAuthorized(_token, callback = function() {}) {
        if (_token == undefined || _token == "" || _token == null) {
            throw "Token is undefined";
        }
        this.token = _token;
        getData(this.token, this.ip, function(result) {
            if (result != undefined) {
                callback(result);
            } else {
                callback(undefined);
            }
        })
        setInterval(() =>{
        }, this.pollingInterval)
    }
}

function getData(_token, _ip, callback = function() {}) {
    if (_token == undefined || _token == "" || _token == null) {
        throw "Token is undefined";
    }
    if (_ip == undefined || _ip == "" || _ip == null) {
        throw "IP is undefined";
    }
    axios.get(`https://${_ip}/api/${_token}/`, { httpsAgent: agent })
    .then(response => {
        if (response.length = 1) {
            try {
                throw response.data[0].error.description;
            } catch (e) {
                console.log(response.data);
            }
        }
    })

    .catch(error => {
        throw error;
    });
}



module.exports = { HueBridgeAgent }