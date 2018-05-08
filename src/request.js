/**
 * opensky-lib
 * Node.js client for the OpenSky Network
 * @author luisan00
 * @copyright (c) 2018 luisan00
 */

const https = require('https');

module.exports = function(account, path) {
	this.options = {};
    this.options.port = 443
    this.options.method = 'GET';
    if(!account){
    	this.options.hostname = `${account.user}:${account.password}@opensky-network.org/api`;
    } else {
    	this.options.hostname = 'opensky-network.org/api';
    }
    this.options.path = path;
    this.options.headers = {
        'Accept': 'application/json'
    };
    
    var self = this;

    return new Promise(function(resolve, reject) {
        var data = '';
        const req = https.get(self.options, (res) => {
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));

                } catch(e){
                    reject({
                        Error: e
                    });
                }
                
            });
        });
        req.on('error', (err) => {
            reject({
                Error: err
            });
        });
    });

};