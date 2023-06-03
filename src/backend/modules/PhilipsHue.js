const axios = require('axios');
const { json } = require('stream/consumers');
const https = require('https');
var events = require('events');
var SSDP = require('node-ssdp').Client
var os = require("os");

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
    
    discoverHueBridges(timeout = 5000) {
        return new Promise((resolve, reject) => {
            let client = new SSDP();
            let e = []
            client.on('response', function (headers, statusCode, rinfo) {
                if (!e.includes(rinfo.address)) {e.push(rinfo.address);}
            });
    
            client.search('urn:schemas-upnp-org:device:Basic:1');
            
            setTimeout(function () {
                client.stop();
                let a = []
                for(var i in e) {
                    a.push(new HueBridge(undefined, e[i], 443, os.hostname()))
                }
                resolve(a);
            }, timeout);
        })
    }
}

class HueBridge{
    id = "";
    ip = "";
    port = 443;
    username = undefined;
    token = undefined;
    authorized = false;
    pollingInterval = 2000;
    system = {}

    eventEmitter = new events.EventEmitter();

    constructor(id, ip, port, username, token){
        this.id = id;
        this.ip = ip;
        this.port = port;
        this.username = username;
        this.token = token;

        setInterval(() => {
            let authed = this.authorized;
            if (authed) {
                console.log("Polling Hue Bridge: " + this.ip)
                getData(this.token, this.ip).then((result) => {
                    if (result.length == 0) {
                        this.authorized = false;
                    } else {
                        this.authorized = true;
                        this.system = result;
                    }
                }).catch((err) => {})
            }
        }, this.pollingInterval);
    }

    connectAuthorized(_token) {
        return new Promise((resolve, reject) => {
            if (_token == undefined || _token == "" || _token == null) {
                reject("TOKEN_UNDEFINED");
            }
            this.token = _token;
            getData(this.token, this.ip).then((result) => {
                if (result.length == 0) {
                    reject("TOKEN_INVALID");
                } else {
                    this.authorized = true;
                    this.system = result;
                    resolve();
                }
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

const getData = function(_token, _ip) {
    return new Promise((resolve, reject) => {
        if (_token == undefined || _token == "" || _token == null) {
            reject("TOKEN_UNDEFINED");
        }
        if (_ip == undefined || _ip == "" || _ip == null) {
            reject("IP_UNDEFINED");
        }
        axios.get(`https://${_ip}/api/${_token}/`, { httpsAgent: agent })
        .then(response => {
            if (response.data.length = 1) {
                try {
                    eventEmitter.emit("error", response.data[0].error.description)
                    throw response.data[0].error.description;
                } catch (e) {
                    resolve(response.data)
                }
            }
        })
    
        .catch(error => {
            reject(error);
        });
    })
}



module.exports = { HueBridgeAgent, HueBridge }