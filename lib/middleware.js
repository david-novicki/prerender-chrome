const url = require('url'),
    util = require('./util');

module.exports = (client) => {
    return {
        whitelist: (req, res, next) => {
            const parsed = url.parse(req.prerender.url);

            if (this.ALLOWED_DOMAINS.indexOf(parsed.hostname) > -1)
                next();
            else
                res.send(404);
        },
        cache: (req, res, next) => {
            const url = util.getUrl(req);
            client.get(url, function (err, data) {
                if (err) throw err;
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