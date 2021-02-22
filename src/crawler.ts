const Crawler = require('crawler');
const dayjs = require('dayjs');

const reqConfList = [];

const c = new Crawler({
    maxConnections : 10,
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

function reqQueue (reqConf) {
    return new Promise((resolve, reject) =>　{
        c.queue([{
            uri: reqConf.url,
            method: reqConf.options.method,
            headers: reqConf.options.headers,
            body: JSON.stringify(reqConf.options.reqParams),
            jQuery: reqConf.options.resType === 'json' ? false : true,
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
