const chrome = require('./chrome'),
    schedule = require('node-schedule'),
    fs = require('fs'),
    cacheInterval = process.env.CACHE_INTERVAL || 59,
    log = 'cron-log.txt';

module.exports = function (client) {
    const getKeys = () => {
        return new Promise((resolve, reject) => {
            client.keys('*', (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
    const refreshCache = async () => {
        let keys = await getKeys();
        console.log('refreshing', keys.length, 'keys');
        for (let key of keys) {
            let result = await chrome.getHTMLString(key);
            client.set(key, result);
        }
    }
    return {
        runCron: async function () {
            console.log('starting cron');
            var j;
            try {
                j = schedule.scheduleJob(`*/${cacheInterval} * * * *`, async function () {
                    console.log('running job');
                    await refreshCache();
                    fs.appendFile(log, 'Success: ' + new Date(), (err) => { if (err) return console.log(err); });
                });
            } catch (error) {
                fs.appendFile(log, error, (err) => { if (err) return; });
            }
            return j;
        }
    }
}