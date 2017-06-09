const CDP = require('chrome-remote-interface');

module.exports.getHTMLString = (url) => {
    return new Promise((resolve, reject) => {
        CDP((client) => {
            // Extract used DevTools domains.
            const { Page, Runtime } = client;

            // Enable events on domains we are interested in.
            Promise.all([
                Page.enable()
            ]).then(() => {
                return Page.navigate({ url: url });
            });

            // Evaluate outerHTML after page has loaded.
            Page.loadEventFired(() => {
                Runtime.evaluate({ expression: "document.documentElement.outerHTML" }).then((result) => {
                    //console.log(result.result.value);
                    resolve(result.result.value);
                    client.close();
                });
            });
        }).on('error', (err) => {
            //console.error('Cannot connect to browser:', err);
            reject(err);
        });
    })
}

