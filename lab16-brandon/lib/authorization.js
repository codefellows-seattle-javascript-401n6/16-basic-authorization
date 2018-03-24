'use strict';

function getCreds(req, res) {

    let authHeader = req.get('Authorization');

    if (!authHeader) {
        res.sendStatus(401, 'You must provide username/password');
        return;
    }
    let payload = authHeader.split('Basic ')[1];
    let decoded = Buffer.from(payload, 'base64').toString();
    return decoded.split(':');
}
module.exports = getCreds;