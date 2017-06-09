var url = require('url');

var util = exports = module.exports = {};

// Gets the URL to prerender from a request, stripping out unnecessary parts
util.getUrl = function (req) {
    var decodedUrl
      , realUrl = req.url
      , parts;

    realUrl = realUrl.replace(/^\//, '');

    try {
        decodedUrl = decodeURIComponent(realUrl);
    } catch (e) {
        decodedUrl = realUrl;
    }
    decodedUrl = this.encodeHash(decodedUrl);

    //if decoded url has two query params from a decoded escaped fragment for hashbang URLs
    if(decodedUrl.indexOf('?') !== decodedUrl.lastIndexOf('?')) {
        decodedUrl = decodedUrl.substr(0, decodedUrl.lastIndexOf('?')) + '&' + decodedUrl.substr(decodedUrl.lastIndexOf('?')+1);
    }

    parts = url.parse(decodedUrl, true);

    // Remove the _escaped_fragment_ query parameter
    if (parts.query && parts.query['_escaped_fragment_'] !== undefined) {
        
        if (parts.query['_escaped_fragment_'] && !Array.isArray(parts.query['_escaped_fragment_'])) {
            parts.hash = '#!' + parts.query['_escaped_fragment_'];
        }

        delete parts.query['_escaped_fragment_'];
        delete parts.search;
    }

    // Bing was seen accessing a URL like /?&_escaped_fragment_=
    delete parts.query[''];

    var newUrl = url.format(parts);

    //url.format encodes spaces but not arabic characters. decode it here so we can encode it all correctly later
    try {
        newUrl = decodeURIComponent(newUrl);
    } catch (e) {}

    newUrl = this.encodeHash(newUrl);

    return newUrl;
};

util.encodeHash = function(url) {
    if(url.indexOf('#!') === -1 && url.indexOf('#') >= 0) {
        url = url.replace(/#/g, '%23');
    }

    return url;
}

