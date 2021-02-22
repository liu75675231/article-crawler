const { initOrGetWorksheet, writeToFile } = require('./xlsx.ts');
const {run, setReqConf} = require('./crawler.ts');
const crawlerConf = require('./conf.ts');

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc') // dependent on utc plugin
var timezone = require('dayjs/plugin/timezone');
var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);
dayjs.extend(utc)
dayjs.extend(timezone)

const argList = process.argv;

const isForceUpdate = argList.indexOf('--forceUpdate') > -1 ? true : false;

const region = argList.reduce((accumulator, curValue) => {
    if (curValue.indexOf('--region') > -1) {
        return curValue.split('=')[1];
    }
    return accumulator;
}, "") || "chinese";

dayjs.tz.setDefault(crawlerConf[region].timezone);

const argDate = argList.reduce((accumulator, curValue) => {
    if (curValue.indexOf('--date') > -1) {
        return curValue.split('=')[1];
    }
    return accumulator;
}, "");

console.log(new Date());
const dateObj = argDate ? dayjs.tz(argDate) : dayjs.tz();

console.log(dateObj.format('YYYY-MM-DD HH:mm:ss'));
(async () => {
    const todayStr = dateObj.format('YYYY-MM-DD');
    const sheetToday = await initOrGetWorksheet(todayStr + '-' + region);
    const originRowCount = sheetToday.rowCount - 1;

    crawlerConf[region].list.forEach(data => {
        setReqConf(data.url, {
            method: data.method || 'get',
            headers: data.headers || {},
            resType: data.resType,
            reqParams: data.reqParams || {},
        }, ($) => {
            const list = [];
            if (data.resType === 'json') {
                compileJsonList($, data, list);
            } else {
                compileHtmlList($, data, list);
            }

            return list;
        });
    });

    run((list) => {
        if (!isForceUpdate && list.length === originRowCount) {
            console.log('nothing update');
            return;
        }

        sheetToday.addRows(list);
        writeToFile();
        console.log('\x1b[33m%s\x1b[0m', 'has updated');
    });

    function compileJsonList (resData, conf, targetList) {
        JSON.parse(resData)[conf.list].forEach((elem) => {
            let originDate = elem[conf.date];
            conf.dateType === 'secondUnix' && (originDate = originDate * 1000);
            const articleDate = dayjs.tz(originDate);
            // articleDate.isSame(dateObj, 'day');
            if (articleDate.isSame(dateObj, 'day')) {
                targetList.push({
                    type: conf.type,
                    title: elem[conf.title],
                    date: articleDate.format('YYYY-MM-DD'),
                    url: conf.href(elem),
                });
            }

        });
    }

    function compileHtmlList ($, conf, targetList) {
        $(conf.selectorList).each((index, elem) => {
            const $elem = $(elem);
            const articleDate = dayjs.tz($elem.find(conf.selectorDate).text());

            if (articleDate.isSame(dateObj, 'day')) {
                targetList.push({
                    type: conf.type,
                    title: $elem.find(conf.selectorTitle).text(),
                    url: conf.href($elem),
                    date: articleDate.format('YYYY-MM-DD'),
                });
            };
        });
    }
})();
