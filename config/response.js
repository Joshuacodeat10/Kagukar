const httpMsgs = require("http-msgs");


module.exports = function notif(req, res, alert, response, status, redirect, data) {
    httpMsgs.sendJSON(req, res, {
        alert,
        response,
        status,
        redirect,
        data
    });
}