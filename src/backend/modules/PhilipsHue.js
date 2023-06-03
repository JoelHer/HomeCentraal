const axios = require('axios');
const { json } = require('stream/consumers');
const https = require('https');
var events = require('events');
var SSDP = require('node-ssdp').Client

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
    
    discoverHueBridges() {
        return new Promise((resolve, reject) => {
          const ssdp = new SSDP();
          const bridges = [];
      
          ssdp.on('response', (headers, statusCode, rinfo) => {
            // Check if the response matches the Philips Hue bridge service type
            if (headers.ST === 'urn:schemas-upnp-org:device:Basic:1') {
              // Extract the bridge's IP address from the response
              const ipAddress = rinfo;
              console.log(rinfo)
      
              // Add the bridge's IP address to the list
              bridges.push(ipAddress);
            }
          });
      
          // Start the SSDP server to listen for SSDP responses
          ssdp.start();
      
          // Send an SSDP search request for the Philips Hue bridge service type
          ssdp.search('urn:schemas-upnp-org:device:Basic:1');
      
          // Set a timeout to stop the discovery process after a specified duration (e.g., 5 seconds)
          const timeout = setTimeout(() => {
            ssdp.stop();
            resolve(bridges); // Return the discovered bridges
          }, 5000);
      
          // Handle errors
          ssdp.on('error', (err) => {
            clearTimeout(timeout);
            ssdp.stop();
            reject(err);
          });
        })
        .catch((err) => {
          console.error('Error discovering bridges:', err);
          return []; // Return an empty array in case of an error
        });
      }
      

    createManually(_ip, _username, _token) {
        if (_ip == undefined || _ip == "" || _ip == null) {
            throw "IP is undefined";
        }
        if (_username == undefined || _username == "" || _username == null) {
            throw "Username is undefined";
        }
        if (_token == undefined || _token == "" || _token == null) {
            throw "Token is undefined";
        }
        return new HueBridge("", _ip, 443, _username, _token);
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

    eventEmitter = new events.EventEmitter();

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
            if (result.length == 1) {
                callback(undefined);
            } else {
                callback(result);
            }
        })
        setInterval(() =>{
            getData(this.token, this.ip, function(result) {
                if (result.length == 0) {
                    //callback(undefined);
                } else {
                    //callback(result);
                    //console.log(result);
                }
            })
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
        if (response.data.length = 1) {
            try {
                eventEmitter.emit("error", response.data[0].error.description)
                throw response.data[0].error.description;
            } catch (e) {
                callback(response.data)
            }
        }
    })

    .catch(error => {
        throw error;
    });
}



module.exports = { HueBridgeAgent }