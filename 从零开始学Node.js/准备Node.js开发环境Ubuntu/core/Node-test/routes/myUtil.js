const http = require('http');
const request = require('request');

const MyUtil = function () {

};

MyUtil.prototype.get = function (url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body, response.statusCode);
        }
    })
}

module.exports = new MyUtil();