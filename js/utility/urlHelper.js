window.URLHelper = (function() {

    var getParams = function(queryStr) {
        var params = {};
        var vars = queryStr.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };

    var dataToUrlQuery = function ndataToUrl(sessionId, host, supplier, message) {
        var based64 = LZString.compressToEncodedURIComponent("sessionId=" + sessionId + '&host=' + host.trim() + "&supplier=" + supplier.trim() + '&message=' + message.trim());
        return based64;
    }

    var urlToData = function ndataToUrl(url) {
        const data = {
            sessionId: "0",
            host: window.location.origin,
            message: undefined
        }

        if (url) {
            url = url.slice(url.lastIndexOf('?'), url.length);
            var dataStr = decodeURIComponent(url).replace("?data=", '');
            dataStr = LZString.decompressFromEncodedURIComponent(dataStr);
            const urlParams = getParams(dataStr);
            data.sessionId = urlParams["sessionId"];
            data.host = urlParams["host"];
            data.message = urlParams["message"];
            data.supplier = urlParams["supplier"];
        }

        return data;
    }

    return {
        getUrlParams: getParams,
        dataToUrlQuery: dataToUrlQuery,
        urlToData: urlToData
    }
})();