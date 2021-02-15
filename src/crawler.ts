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

function setReqConf (url, callback) {
    reqConfList.push({
        url,
        callback,
    });
}

async function run (callback) {
    let list = [];
    for (const reqConf of reqConfList) {
        // @ts-ignore
        list.push(...(await reqQueue(reqConf.url, reqConf.callback)));
    }
    callback(list);
}

function reqQueue (uri, handler) {
    return new Promise((resolve, reject) =>　{
        c.queue([{
            uri,
            callback: function (error, res, done) {
                if(error){
                    reject(error);
                    console.log(error);
                }else{
                    const $ = res.$;
                    resolve(handler($));
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
