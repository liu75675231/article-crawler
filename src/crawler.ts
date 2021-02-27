const Crawler = require('crawler');
const dayjs = require('dayjs');

const reqConfList = [];

const c = new Crawler({
    rateLimit: 1000,
    maxConnections : 1,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            console.log($("title").text());
        }
        done();
    }
});

function setReqConf (url, options, callback) {
    reqConfList.push({
        url,
        options,
        callback,
    });
}

async function run (callback) {
    let list = [];
    for (const reqConf of reqConfList) {
        // @ts-ignore
        list.push(...(await reqQueue(reqConf)));
    }
    callback(list);
}

function getJQueryOptions (reqConf) {
    if (reqConf.options.resType === 'json') {
        return false;
    }

    if (reqConf.options.isResXml) {
        return {
            name: 'cheerio',
            options: {
                xmlMode: true
            }
        }
    }
    return true;
}

function reqQueue (reqConf) {
    return new Promise((resolve, reject) =>　{
        c.queue([{
            uri: reqConf.url,
            method: reqConf.options.method,
            headers: reqConf.options.headers,
            http2: reqConf.options.isHttp2,
            body: JSON.stringify(reqConf.options.reqParams),
            jQuery: getJQueryOptions(reqConf),
            callback: function (error, res, done) {
                if(error){
                    reject(error);
                    console.log(error);
                }else{
                    if (reqConf.options.resType === 'json') {
                        resolve(reqConf.callback(res.body));
                    } else {
                        const $ = res.$;
                        resolve(reqConf.callback($));
                    }
                }
                done();
            }
        }]);
    });
}

module.exports = {
    run,
    setReqConf
}
