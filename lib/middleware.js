const url = require('url'),
    util = require('./util');

var ALLOWED_DOMAINS = process.env.ALLOWED_DOMAINS || [],
    ALLOWED_DOMAINS = ALLOWED_DOMAINS.split(',');

module.exports = (client) => {
    return {
        whitelist: (req, res, next) => {
            const parsed = util.getUrl(req);
            if (ALLOWED_DOMAINS.indexOf(parsed.hostname) > -1)
                next();
            else
                res.status(404).send();
        },
        cache: (req, res, next) => {
            const url = util.getUrl(req);
            client.get(url, function (err, data) {
                if (err) res.status(404).send();
                if (data != null) {
                    console.log('cached');
                    res.send(data);
                } else {
                    next();
                }
            });
        }
    }
}