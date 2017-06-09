const express = require('express'),
    app = express(),
    util = require('./lib/util'),
    chrome = require('./lib/chrome'),
    redis = require('redis'),
    port = process.env.PORT || 3000;

const client = redis.createClient();
const cacheUtil = require('./lib/cache')(client),
    middleware = require('./lib/middleware')(client);

client.on('connect', function () {
    console.log('connected to redis');
});

app.use(middleware.whitelist);

app.get('*', middleware.cache, (req, res) => {
    const url = util.getUrl(req);
    console.log(url);
    chrome.getHTMLString(url).then(result => {
        client.set(url, result);
        res.send(result);
    }).catch(error => {
        console.log(error);
        res.status(400).send('Cannot find ' + url);
    });
});

cacheUtil.runCron();
app.listen(port, () => {
    console.log('Listening on port:' + port);
});